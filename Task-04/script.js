const apiKey = "6b4b413bb3f01444530b44763be4b2f7";
let weatherData = document.querySelector('.weather-data')
let weatherDetails = document.querySelector('.weather-details');
const formElement = document.querySelector('form');

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.querySelector('input').value;
  getWeather(city);
})

async function getWeather (city) {
  if(city.trim() === '') {
    alert('Please enter a City :)');
    return;
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const data = await response.json();
    console.log(data);

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}&deg;C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed}m/s`
    ];

    document.getElementById('icon').src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.getElementById('icon').style.display = "block";
    document.getElementById('temperature').innerHTML = `${temperature}&deg;C`;
    document.getElementById('description').textContent = description;

    weatherDetails.innerHTML = details.map(detail => `<div>${detail}</div>`).join(''); 

  } catch(err) {
    document.getElementById('icon').style.display = 'none';
    document.getElementById('temperature').textContent = '';
    document.getElementById('description').textContent = 'Error. Please try again later';
    weatherDetails.innerHTML = ''
  }
}