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

// This function saves the currently display city to local storage
function storeCurrentCity() {
    localStorage.setItem("currentCity", JSON.stringify(cityname));
}