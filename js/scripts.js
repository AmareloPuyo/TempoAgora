const apiKey = "0cf8a46299d88f8eb1b7a6be2df7d121"
const apiUnsplash = `https://source.unsplash.com/1366x768/?`;

const input = document.querySelector("#city-input");
const search = document.querySelector("#search");
const city = document.querySelector("#city");
const temperature = document.querySelector("#temperature span");
const description = document.querySelector("#description span");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");
const weatherIcon = document.querySelector("#weather-icon");
const country = document.querySelector("#country");
const dataHour = document.querySelector(".data h2");
const body = document.querySelector("body");
const minTemp = document.querySelector("#min-temp");
const maxTemp = document.querySelector("#max-temp");

// Funções
const dayHour = () => {
    var diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const dateHourNow = new Date();
    const day = dateHourNow.getDate();
    const mount = dateHourNow.getMonth() + 1;
    const dayWeek = dateHourNow.getDay();

    dataHour.innerHTML = `${day}/${mount} <p>${diasDaSemana[dayWeek]}</p>` 

}
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    printData(data)
}
const getInicialData = async (lat, lon) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    printData(data)
    dayHour()
}
function toUpper(string) {
    return string.replace(/^\w/, c => c.toUpperCase());
}


const printData = async (data) => {
    const temp = (data.main.temp)
    const descrição = data.weather[0].description
    const desMaius = toUpper(descrição)

    console.log(data)

    city.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.name}`;
    temperature.innerText = Math.floor(temp) + `\u00B0C`;
    description.innerHTML = `${desMaius}`;
    minTemp.innerHTML = `<i class="fa-solid fa-arrow-down"></i> ${Math.floor(data.main.temp_min)} &deg;`;
    maxTemp.innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${Math.floor(data.main.temp_max)} &deg;`;
    humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.main.humidity} %`;
    wind.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.wind.speed} km/h`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    country.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`;

    document.body.style.backgroundImage = `url("${apiUnsplash + data.name}")`;

}

// Eventos

search.addEventListener("click", () => {
    const city = input.value;
    input.value = ""
    getWeatherData(city)
})


navigator.geolocation.getCurrentPosition((position) => {
    const currentLatitude = position.coords.latitude;
    const currentLongitude = position.coords.longitude;

    window.alert(currentLatitude,currentLongitude)
    getInicialData(currentLatitude, currentLongitude)
})


