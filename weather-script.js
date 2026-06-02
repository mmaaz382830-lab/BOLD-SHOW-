// Weather Dashboard JavaScript
// Using OpenWeatherMap Free API

const API_KEY = '8d5b62c2ef8e495a1d0230cea0c97e3d'; // Free tier API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const weatherContent = document.getElementById('weatherContent');
const welcomeMessage = document.getElementById('welcomeMessage');
const forecastContainer = document.getElementById('forecastContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
geoBtn.addEventListener('click', handleGeolocation);

// Weather Icon Mapping
const weatherIconMap = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌧️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️'
};

// Handle Search
function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        searchInput.value = '';
    }
}

// Handle Geolocation
function handleGeolocation() {
    if (navigator.geolocation) {
        geoBtn.disabled = true;
        geoBtn.textContent = '⏳';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
                geoBtn.disabled = false;
                geoBtn.textContent = '📍';
            },
            (error) => {
                showError('Unable to get your location. Please enable location access.');
                geoBtn.disabled = false;
                geoBtn.textContent = '📍';
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Fetch Weather by City
async function fetchWeatherByCity(city) {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        await fetchWeatherDetails(data.coord.lat, data.coord.lon);
    } catch (error) {
        showError(`Error: ${error.message}`);
        showLoading(false);
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading(true);
        hideError();
        await fetchWeatherDetails(lat, lon);
    } catch (error) {
        showError(`Error: ${error.message}`);
        showLoading(false);
    }
}

// Fetch Complete Weather Details
async function fetchWeatherDetails(lat, lon) {
    try {
        // Fetch current weather and forecast (One Call API)
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) throw new Error('Failed to fetch weather data');

        const currentData = await response.json();

        // Fetch forecast data
        const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');

        const forecastData = await forecastResponse.json();

        // Update UI with both current and forecast data
        displayCurrentWeather(currentData);
        displayForecast(forecastData.list);
        
        showLoading(false);
        showWeatherContent();
    } catch (error) {
        showError(`Error: ${error.message}`);
        showLoading(false);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const {
        name,
        sys: { country },
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        weather: [{ main, description, icon }],
        wind: { speed },
        visibility,
        clouds: { all: cloudCoverage }
    } = data;

    // Update location
    document.getElementById('cityName').textContent = name;
    document.getElementById('countryCode').textContent = country;

    // Update current weather
    document.getElementById('currentTemp').textContent = Math.round(temp) + '°C';
    document.getElementById('weatherIcon').textContent = weatherIconMap[icon] || '🌤️';
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('feelsLike').textContent = `Feels like ${Math.round(feels_like)}°C`;

    // Update details
    document.getElementById('humidity').textContent = humidity + '%';
    document.getElementById('windSpeed').textContent = speed.toFixed(1) + ' m/s';
    document.getElementById('pressure').textContent = pressure + ' hPa';
    document.getElementById('visibility').textContent = (visibility / 1000).toFixed(1) + ' km';
    document.getElementById('cloudCoverage').textContent = cloudCoverage + '%';

    // Update temperature stats
    document.getElementById('tempMax').textContent = Math.round(temp_max) + '°C';
    document.getElementById('tempMin').textContent = Math.round(temp_min) + '°C';

    // Update sunrise and sunset
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    document.getElementById('sunrise').textContent = formatTime(sunrise);
    document.getElementById('sunset').textContent = formatTime(sunset);

    // Update last updated time
    const now = new Date();
    document.getElementById('lastUpdated').textContent = formatTime(now);

    // Calculate approximate UV Index and Dew Point (approximations)
    const uvIndex = calculateUVIndex(temp, humidity, new Date(data.sys.sunrise * 1000), new Date(data.sys.sunset * 1000));
    const dewPoint = calculateDewPoint(temp, humidity);

    document.getElementById('uvIndex').textContent = uvIndex.toFixed(1);
    document.getElementById('dewPoint').textContent = Math.round(dewPoint) + '°C';
    document.getElementById('precipitation').textContent = '0 mm'; // Not available in free tier
}

// Display 5-Day Forecast
function displayForecast(forecastList) {
    // Group forecast by day (one entry per day at noon)
    const dailyForecasts = {};

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        // Take forecast at 12:00 if available, otherwise first available
        if (!dailyForecasts[day] || date.getHours() === 12) {
            dailyForecasts[day] = forecast;
        }
    });

    // Display up to 5 days
    forecastContainer.innerHTML = '';
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const {
            dt,
            main: { temp_max, temp_min },
            weather: [{ icon, description }],
            wind: { speed }
        } = forecast;

        const date = new Date(dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <div class="forecast-icon">${weatherIconMap[icon] || '🌤️'}</div>
            <div class="forecast-temp">${Math.round(temp_max)}° / ${Math.round(temp_min)}°</div>
            <div class="forecast-desc">${description}</div>
            <div style="font-size: 0.85em; margin-top: 5px;">💨 ${speed.toFixed(1)} m/s</div>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

// Helper Functions
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

function calculateDewPoint(temp, humidity) {
    // Magnus approximation formula
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint;
}

function calculateUVIndex(temp, humidity, sunrise, sunset) {
    // Very rough approximation based on time of day and cloud cover
    const now = new Date();
    const dayLength = (sunset - sunrise) / (1000 * 60 * 60); // hours
    const timeFromSunrise = (now - sunrise) / (1000 * 60 * 60); // hours
    
    // Simple estimation - higher near noon
    const normalizedTime = Math.abs(timeFromSunrise - dayLength / 2);
    const uvIndex = Math.max(0, 10 - (normalizedTime * 3));
    
    return Math.min(uvIndex, 11);
}

// UI Control Functions
function showLoading(show) {
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherContent.classList.add('hidden');
    welcomeMessage.classList.add('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showWeatherContent() {
    weatherContent.classList.remove('hidden');
    welcomeMessage.classList.add('hidden');
}

// Initialize
console.log('Weather Dashboard loaded. Ready to fetch weather data!');
