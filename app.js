const myApiKey = '02189cc9e34d42099ae163333232109';
const signUpBtn = document.getElementById('signUpBtn');
const signupModal = document.getElementById('signupModal');
const closeModal = document.getElementById('closeModal');
const signupForm = document.getElementById('signupForm');
const signupButton = document.getElementById('signupButton');
const input = document.getElementById('searchInput');
const searchBtn = document.getElementById('btn');
const weatherInfo = document.getElementById('section-weather');
const errorMessage = document.getElementById('errorMessage');
const weatherSection = document.getElementById('weather-search-block');
const signUpMsg = document.getElementById('signUpMessage');

const hasSignedUp = localStorage.getItem('hasSignedUp');

if (hasSignedUp) {
  signUpMsg.style.display = 'none';
} else {
  signUpMsg.style.display = 'block';
}

function openModal() {
  signupModal.style.display = 'block';
}

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

signUpBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', () => {
  signupModal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target === signupModal) {
    signupModal.style.display = 'none';
  }
});

const savedEmail = localStorage.getItem('email');
const savedPassword = localStorage.getItem('password');

if (savedEmail && savedPassword) {
  signUpBtn.style.display = 'none';
  weatherSection.style.display = 'block';
  const user = document.getElementById('user');
  user.style.display = 'block';
  user.textContent = savedEmail;
}
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(`Email: ${email}`);
  console.log(`Password : ${password}`);

  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('hasSignedUp', 'true');
  
  signUpMsg.style.display = 'none';
  signUpBtn.style.display = 'none';
  signUpMsg.remove();
  weatherSection.style.display = 'block';
  const user = document.getElementById('user');
  user.style.display = 'block';
  user.textContent = email;

  signupModal.style.display = 'none';
  signUpBtn.remove();
});

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  getWeatherData();
});
