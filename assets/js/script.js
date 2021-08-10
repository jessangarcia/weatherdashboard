//api key: afae4319fa1019c142d85c5c40401962
var cities = [];
var searchForm = document.querySelector("#search-city");
var inputEl = document.querySelector("#city-name");
var weatherContainer = document.querySelector("#current-city-container");
var titleCityName = document.querySelector("#subtitle");
var forecastTitle = document.querySelector("#forecast");
var foreContainer = document.querySelector("#five-container");

var getWeather = function(city) {
    var api = "api.openweathermap.org/data/2.5/weather?q=Portland&units=imperial&appid=afae4319fa1019c142d85c5c40401962"
    
    fetch(api).then(function(response){
        response.json().then(function(data){
            displayWeather(data, city)
        });
    });
};

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

var displayWeather = function(weather, searched){
    //clear out old input
    inputEl.textContent = searched;
    weatherContainer.textContent = "";

}

//getWeather();