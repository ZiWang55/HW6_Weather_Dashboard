// Global variable declarations
var cityList = [];
var cityname;

// local storage functions
initCityList();
initWeather();

// This function displays the city entered by the user into the DOM
function renderCities() {
  $("#cityList").empty();
  $("#cityInput").val("");

  for (i = 0; i < cityList.length; i++) {
    var a = $("<a>");
    a.addClass(
      "list-group-item list-group-item-action list-group-item-primary city"
    );
    a.attr("data-name", cityList[i]);
    a.text(cityList[i]);
    $("#CityList").prepend(a);
  }
}

// This function pulls the city list array from local storage
function initCityList() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cityList = storedCities;
  }

  renderCities();
}

// This function pull the currenty city into local storage to display the current weather forecast on reload
function initWeather() {
  var storedWeather = JSON.parse(localStorage.getItem("currentCity"));
}

// This function saves the currently display city to local storage
function storeCurrentCity() {
  localStorage.setItem("currentCity", JSON.stringify(cityname));

  if (storedWeather !== null) {
    cityname = storedWeather;

    displayWeather();
    displayFiveDayForecast();
  }
}

// This function saves the city array to local storage
function storeCityArray() {
  localStorage.setItem("cities", JSON.stringify(cityList));
}

//  This function saves the currently display city to local storage
function storeCurrentCity() {
  localStorage.setItem("currentCity", JSON.stringify(cityname));
}

// event handler for city search button
$("#citySearchBtn").on("click", function (event) {
  event.preventDefault();

  cityname = $("#cityInput").val().trim();
  if (cityname === "") {
    alert("Please enter a city to look up");
  } else if (cityList.length >= 5) {
    cityList.shift();
    cityList.push(cityname);
  } else {
    cityList.push(cityname);
  }
  storeCurrentCity();
  storeCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});

// Enable enter button to submit city
$("#cityInput").keypress(function (e) {
  if (e.which == 13) {
    $("#citySearchBtn").click();
  }
});

// This function runs the Open Weather API AJAX call, displays: current city, weather , 5 day forecast to the DOM
async function displayWeather() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&units=imperial&appid=d3b85d453bf90d469c82e650a0a3da26";

  var response = await $.ajax({
    url: queryURL,
    method: "GET",
  });
  console.log(reponse);

  var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
  var getCurrentCity = response.name;
  var date = new Date();
  var val =
  date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  var getCurrentWeatherIcon = response.weather[0].icon;
  var displayCUrrentWeatherIcon = $(
    "<img src = http://openweathermap.org/img/wn/" +
    getCurrentWeatherIcon +
    "@2x.png />"
    );
    var currentyCityEl = $("<h3 class = 'card-body'>").text(
        getCurrentCity + " (" + val + ")"
    );
    currentyCityEl.append(displayCUrrentWeatherIcon);
    currentWeatherDiv.append(currentyCityEl);
    var getTemp = reponse.main.temp.toFixed(1);
    var tempEl = $("<p class='card-text'>").text("Temperature: " + getTemp + "° F"
    );
    
}
