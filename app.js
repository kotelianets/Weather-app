const myApiKey = '02189cc9e34d42099ae163333232109';
const loginBtn = document.getElementById('loginBtn');
const input = document.getElementById('searchInput');
const searchBtn = document.getElementById('btn');
const weatherInfo = document.getElementById('section-weather');
const errorMessage = document.getElementById('errorMessage');

function getWeatherData() {
  const inputValue = input.value.trim();
  console.log(inputValue);
  input.value = '';
  const url = `https://api.weatherapi.com/v1/current.json?key=${myApiKey}&q=${inputValue}&aqi=no`;
  if (inputValue === '') {
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
    return;
  }
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const weatherCard = document.createElement('div');
      weatherCard.classList.add('weather-card');
      weatherInfo.innerHTML = '';
      weatherCard.innerHTML = `
          <div class="weather-card__title">${data.location.name}, ${data.location.country}</div>
          <div class="weather-card__temperature">Temperature: ${data.current.temp_c}°C</div>
          <div class="weather-card__cloud">${data.current.condition.text}</div>
          <div class="weather-card__feelsLike">Feels like ${data.current.feelslike_c}°C</div>
        `;
      weatherInfo.appendChild(weatherCard);

      console.log(data);
    })
    .catch((error) => {
      console.error('Something went wrong :', error);
    });
}
searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  getWeatherData();
});
