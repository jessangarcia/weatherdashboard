//api key: afae4319fa1019c142d85c5c40401962
//referenced https://github.com/mlportu/weather-dashboard/blob/master/assets/js/script.js
var cities = [];
var searchForm = document.querySelector("#search-city");
var inputEl = document.querySelector("#city-name");
var weatherContainer = document.querySelector("#current-city-container");
var titleCityName = document.querySelector("#subtitle");
var forecastTitle = document.querySelector("#forecast");
var foreContainer = document.querySelector("#five-container");

function getWeather(city) {
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=afae4319fa1019c142d85c5c40401962"

    fetch(api).then(function (response) {
        response.json().then(function (data) {
            displayWeather(data, city)
        });
    });
};

function formSubmit(event) {
    event.preventDefault();
    var city = inputEl.value.trim();

    if (city) {
        getWeather(city);
        fetchForecast(city);

        //unshift array https://www.w3schools.com/jsref/jsref_unshift.asp
        cities.unshift({ city });
        inputEl.value = "";
    } else {
        alert("Please enter a city");
    }

    saveSearch();
}

function saveSearch() {
    localStorage.setItem("cities", JSON.stringify(cities));
}


function displayWeather(weather, searched) {
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

    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    getUV(lat, lon);

}

function getUV(lat, lon) {
    var uvApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=afae4319fa1019c142d85c5c40401962"

    fetch(uvApi).then(function (response) {
        response.json().then(function (data) {
            uvIndex(data)
        });
    });
};

function uvIndex(data) {
    //create element for uv index api
    var index = data.current.uvi;
    //index container
    var uvContainer = document.createElement("div");
    uvContainer.classList = "weather-list";
    uvContainer.textContent = "UV Index: ";
    //index element
    var uv = document.createElement("span");
    uv.textContent = index;

    if (index <= 2) {
        uv.classList = "favorable"
    } else if (index > 2 && index <= 8) {
        uv.classList = "moderate"
    } else if (index > 8) {
        uv.classList = "severe"
    };

    uvContainer.appendChild(uv);

    weatherContainer.appendChild(uvContainer);
}

function fetchForecast(city) {
    var castApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=afae4319fa1019c142d85c5c40401962"

    fetch(castApi).then(function (response) {
        response.json().then(function (data) {
            fiveDay(data);
        });
    });
};

function fiveDay(weather) {
    foreContainer.textContent = "";
    forecastTitle.textContent = "Five Day Forecast:";

    var cast = weather.list;
    for (var i = 5; i < cast.length; i = i + 8) {
        var daily = cast[i];

        var castContain = document.createElement("div")
        //https://getbootstrap.com/docs/4.0/components/card/
        castContain.classList = "card bg-primary m-2";

        var castDate = document.createElement("h3");
        //https://momentjs.com/docs/
        castDate.textContent = moment.unix(daily.dt).format("MMM D, YYYY");
        castDate.classList = "card-header text-center";
        castContain.appendChild(castDate);

        //copied from displayWeather() display icon from api/create an image
        var castIcon = document.createElement("img");
        castIcon.classList = "card-body text-center";
        castIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + daily.weather[0].icon + ".png");
        castContain.appendChild(castIcon);

        //copied from displayWeather() create element to append to page
        var foreTemp = document.createElement("span");
        foreTemp.classList = "card-body text-center";
        foreTemp.textContent = "Temp: " + daily.main.temp + " °F";

        castContain.appendChild(foreTemp);

        var foreSpeed = document.createElement("span");
        foreSpeed.classList = "card-body text-center";
        foreSpeed.textContent = "Wind: " + daily.wind.speed + " MPH";

        castContain.appendChild(foreSpeed);

        var foreHum = document.createElement("span");
        foreHum.classList = "card-body text-center";
        foreHum.textContent = "Humidity: " + daily.main.humidity + " %";

        castContain.appendChild(foreHum);

        foreContainer.appendChild(castContain);
    }

}


searchForm.addEventListener("submit", formSubmit);

