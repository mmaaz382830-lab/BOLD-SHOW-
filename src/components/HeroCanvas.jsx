import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function HeroCanvas() {
  const containerRef = useRef(null)
  const modelRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.3, 6)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const cyanLight = new THREE.DirectionalLight(0x00F5FF, 8)
    cyanLight.position.set(3, 2, 3)
    scene.add(cyanLight)

    const redLight = new THREE.DirectionalLight(0xFF2D55, 4)
    redLight.position.set(-3, -1, -2)
    scene.add(redLight)

    const topLight = new THREE.DirectionalLight(0xffffff, 2)
    topLight.position.set(0, 5, 0)
    scene.add(topLight)

    const rimLight = new THREE.DirectionalLight(0xffffff, 4)
    rimLight.position.set(0, 0, -5)
    scene.add(rimLight)

    // Ground glow effect
    const glowGeo = new THREE.CircleGeometry(3, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00F5FF,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    glowMesh.rotation.x = -Math.PI / 2
    glowMesh.position.y = -1.5
    scene.add(glowMesh)

    // Orbit Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.8

    // Draco + GLTF Loader configuration
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      '/sneakers.glb',
      (gltf) => {
        // Center model inside scene
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        gltf.scene.position.sub(center)
        gltf.scene.position.y -= 0.3

        // Scale model to fit viewport elegantly
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetSize = 2.5
        const scaleFactor = targetSize / maxDim
        gltf.scene.userData.maxDim = maxDim
        gltf.scene.scale.setScalar(scaleFactor)

        // Cache reference and attach to scene
        modelRef.current = gltf.scene
        scene.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error('An error happened loading the sneaker model:', error)
      }
    )

    // Responsive Resize listener
    const handleResize = () => {
      if (!containerRef.current) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    const scrollProgress = { current: 0 }
    const targetScrollProgress = { current: 0 }

    const handleScroll = () => {
      const maxScroll = window.innerHeight
      const raw = window.scrollY / maxScroll
      targetScrollProgress.current = Math.min(raw, 1)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Request Animation Frame loop
    const animate = () => {
      controls.update()

      scrollProgress.current += (targetScrollProgress.current - scrollProgress.current) * 0.06

      if (modelRef.current) {
        const s = scrollProgress.current
        
        // Move shoe left as user scrolls
        modelRef.current.position.x = s * 2.5
        
        // Shrink shoe as user scrolls
        const baseScale = modelRef.current.scale.x
        const currentScale = (1 - s * 0.4)
        modelRef.current.scale.setScalar(
          (2.5 / Math.max(modelRef.current.userData.maxDim || 1, 0.001)) * currentScale
        )
        
        // Slight tilt on scroll
        modelRef.current.rotation.z = s * 0.2
      }

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Clean up on component unmount
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      
      controls.dispose()
      renderer.dispose()
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      dracoLoader.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0
      }}
    />
  )
}
