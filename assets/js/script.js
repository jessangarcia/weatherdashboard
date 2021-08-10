//api key: afae4319fa1019c142d85c5c40401962
//referenced https://github.com/mlportu/weather-dashboard/blob/master/assets/js/script.js
var cities = [];
var searchForm = document.querySelector("#search-city");
var inputEl = document.querySelector("#city-name");
var weatherContainer = document.querySelector("#current-city-container");
var titleCityName = document.querySelector("#subtitle");
var forecastTitle = document.querySelector("#forecast");
var foreContainer = document.querySelector("#five-container");

var getWeather = function(city) {
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=afae4319fa1019c142d85c5c40401962"
    
    fetch(api).then(function(response){
        response.json().then(function(data){
            displayWeather(data, city)
        });
    });
};

var formSubmit = function(event) {
    event.preventDefault();
    var city = inputEl.value.trim();

    if (city) {
        getWeather(city);

        //unshift array https://www.w3schools.com/jsref/jsref_unshift.asp
        cities.unshift({city});
        inputEl.value = "";
    } else {
        alert("Please enter a city");
    }

    saveSearch();
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}


var displayWeather = function(weather, searched){
    //clear out old input
    weatherContainer.textContent = "";
    titleCityName.textContent = searched;

    //display city name and current date
    var date = document.createElement("span");
    //https://momentjs.com/docs/
    date.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    titleCityName.appendChild(date);

    //console.log(date);

    //display icon from api/create an image
    var icon = document.createElement("img");
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png");
    titleCityName.appendChild(icon);

    //temp, wind, humidity, creating span
    var temp = document.createElement("span");
    temp.classList = "weather-list"
    var wind = document.createElement("span");
    wind.classList = "weather-list"
    var humid = document.createElement("span");
    humid.classList = "weather-list"

    //text content for temp,wind,humid elements created
    temp.textContent = "Temp: " + weather.main.temp + " °F"
    wind.textContent = "Wind: " + weather.wind.speed + " MPH"
    humid.textContent = "Humidity: " + weather.main.humidity + " %"

    //append temp, wind, humid
    weatherContainer.appendChild(temp)
    weatherContainer.appendChild(wind)
    weatherContainer.appendChild(humid)



}

searchForm.addEventListener("submit", formSubmit);

