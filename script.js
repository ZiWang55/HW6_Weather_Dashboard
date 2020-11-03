// Global variable declarations
let cityList = [];
let cityname;

// local storage functions
initCityList();
initWeather();

// This function displays the city entered by the user into the DOM
function renderCities() {
  $("#cityList").empty();
  $("#cityInput").val("");

  for (i = 0; i < cityList.length; i++) {
    let a = $("<a>");
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
  let storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cityList = storedCities;
  }

  renderCities();
}

// This function pull the currenty city into local storage to display the current weather forecast on reload
function initWeather() {
    let storedWeather = JSON.parse(localStorage.getItem("currentCity"));
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
    } else if (cityList.length >=5) {
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