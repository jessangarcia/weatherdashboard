//api key: afae4319fa1019c142d85c5c40401962
var cities = [];
var searchForm = document.querySelector("#search-city");
var inputEl = document.querySelector("#city-name");
var weatherContainer = document.querySelector("#current-city-container");
var titleCityName = document.querySelector("#subtitle");
var forecastTitle = document.querySelector("#forecast");
var foreContainer = document.querySelector("#five-container");

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

var getWeather = function(city) {
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=afae4319fa1019c142d85c5c40401962"
    
    fetch(api).then(function(response){
        response.json().then(function(data){
            displayWeather(data, city)
        });
    });
};

var displayWeather = function(weather, searched){
    //clear out old input
    weatherContainer.textContent = "";
    inputEl.textContent = searched;

    //display city name and current date
    var date = document.createElement("span");
    //https://momentjs.com/docs/
    date.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    inputEl.appendChild(date);

    console.log(date);
}


searchForm.addEventListener("submit", formSubmit);

