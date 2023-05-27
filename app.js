// Cattura degli elementi HTML
let currentCity = "Rome,it";
let units = "metric";
let cityName = document.querySelector(".city-name");
let cityNameNow = document.querySelector(".city-name-now")
let cityDegreed = document.querySelector(".degreed");
let cityCondition = document.querySelector(".condition");
let date = document.querySelector(".date");
let humidity = document.querySelector(".humidity-value");
let pressure = document.querySelector(".pressure-value");
let feels = document.querySelector(".feels-value");
let wind = document.querySelector(".wind-value");
let sunriseNow = document.querySelector(".sunrise-now");
let sunsetNow = document.querySelector(".sunset-now");
let imgCondition = document.querySelector(".img-condition");

let search = document.querySelector("#search");
let searchInput = document.querySelector("#searchInput");

search.addEventListener("submit",(e)=>{
    e.preventDefault();
    currentCity = searchInput.value;
    getWeather();
})

// creiamo una funzione per convertire il datetime e il datezone
function dateTime(dt, timezone){
    const convertTimezone = timezone / 3600;
    const dateTime = new Date(dt * 1000);

    const option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }

    return dateTime.toLocaleString("en-US", option)
}

function convertSunrise(sunrise) {
    const date = new Date(sunrise * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const convertedSunrise = `${formattedHours}:${formattedMinutes}`;
    return convertedSunrise;
  }
  
  function convertSunset(sunset) {
    const date = new Date(sunset * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const convertedSunset = `${formattedHours}:${formattedMinutes}`;
    return convertedSunset;
  }

async function getWeather(){
    // Catturo i dati
    const api_key = "b11b06399654bb556d37555b0336de13";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${api_key}&units=${units}`;
    let response = await fetch(url);
    let weather = await response.json();
    console.log(weather);
    
    // incapsulo i dati in variabili
    let weatherName = weather.name;
    let weatherCountry = weather.sys.country;
    let weatherPressure = weather.main.pressure;
    let weatherFeels = Math.ceil(weather.main.feels_like);
    let weatherTemp = Math.ceil(weather.main.temp);
    let weatherHumidity = weather.main.humidity;
    let weatherSpeed = weather.wind.speed;
    let weatherCondition = weather.weather[0].main;
    let weatherSunrise = weather.sys.sunrise;
    let weatherSunset = weather.sys.sunset;
    console.log(weatherSunset);
    let weatherDt = weather.dt;
    let weatherTimezone = weather.timezone;

    console.log(weatherCondition);

    // Inserisco i dati
    cityName.innerHTML = `${weatherName}, ${weatherCountry}`;
    cityNameNow.innerHTML = `${weatherName}, ${weatherCountry}`;
    cityDegreed.innerHTML = `${weatherTemp} °`;
    cityCondition.innerHTML=`${weatherCondition}`;
    date.innerHTML = dateTime(weatherDt, weatherTimezone); 
    console.log(date);  
    wind.innerHTML = `${weatherSpeed}m/s`;
    humidity.innerHTML = `${weatherHumidity}%`;
    feels.innerHTML = `${weatherFeels}°c`;
    pressure.innerHTML = `${weatherPressure} hPa`;

    sunriseNow.innerHTML = convertSunrise(weatherSunrise); 
    sunsetNow.innerHTML = convertSunset(weatherSunset); 
   
    if(weatherCondition === "Clouds"){
        imgCondition.src = "https://img.icons8.com/external-dreamcreateicons-flat-dreamcreateicons/100/external-cloudy-weather-dreamcreateicons-flat-dreamcreateicons.png";
    }else if(weatherCondition === "Clear"){
        imgCondition.src = "https://img.icons8.com/office/70/sun--v1.png"
    }else if(weatherCondition === "Rain"){
        imgCondition.src = "https://img.icons8.com/office/70/rain.png"
    }else if(weatherCondition === "Snow"){
        imgCondition.src = "https://img.icons8.com/color/70/snow--v1.png"
    }

}


getWeather();