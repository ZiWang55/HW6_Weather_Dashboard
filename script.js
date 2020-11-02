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
}