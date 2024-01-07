const apiKey = '774c95e2849bcf88bde0cc89b75a4cfd';

function fetchWeatherForCity(city) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            updateBackground(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
            alert('Error fetching weather data. Please try again.');
        });
}

function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    fetchWeatherForCity(location);
}

function displayWeather(data) {
    const weatherInfoContainer = document.getElementById('weather-info');

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    // Convert UTC timestamp to local time of the selected city
    const localTime = new Date(data.dt * 1000).toLocaleTimeString();

    const weatherHtml = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${description}</p>
        
    `;

    weatherInfoContainer.innerHTML = weatherHtml;
}

function updateBackground(data) {
    const weatherCondition = data.weather[0].main;
    const body = document.body;

    const colorMappings = {
        'Clear': '#87CEEB',
        'Clouds': '#B0C4DE',
        'Rain': '#708090',
        'Snow': '#FFFFFF',
        'Thunderstorm': '#556B2F',
        'Drizzle': '#A9A9A9',
        'Mist': '#D3D3D3',
        'Fog': '#D3D3D3',
        'Haze': '#D2B48C',
        'Squall': '#483D8B',
        'Tornado': '#2F4F4F',
    };

    const timeZoneOffset = data.timezone / 3600; // Convert seconds to hours
    const localHour = new Date().getUTCHours() + timeZoneOffset;

    if (colorMappings.hasOwnProperty(weatherCondition)) {
        const color = colorMappings[weatherCondition];
        body.style.backgroundColor = color;

        // Adjust text color based on background color for better visibility
        const textColor = localHour >= 6 && localHour <= 18 ? '#000000' : '#FFFFFF';
        body.style.color = textColor;
    } else {
        body.style.backgroundColor = '#E0E0E0';
        body.style.color = '#000000';
    }
}
