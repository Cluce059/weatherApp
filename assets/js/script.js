var searchInput = document.querySelector("#city");
var searchBtn = document.querySelector("#searchBtn");
var cityName = document.querySelector("#city-name");
var currentDate = document.querySelector("#todaysDate");
var currentTemp  = document.querySelector("#temperature");
var currentHumidity = document.querySelector("#humidity");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentUVIndex = document.querySelector("#UV");
var history = document.querySelector("#search-history");
var icon = document.querySelector("#icon");
var currentConditions = document.querySelector("#description");

var dayOneForecastDate = document.querySelector("#forecast1");
var dayOneForecastTemp = document.querySelector("#day1temp");
var dayOneForecastWind = document.querySelector("#day1wind");
var dayOneForecastHumidity = document.querySelector("#day1humidity");

var dayTwoForecastDate = document.querySelector("#forecast2");
var dayTwoForecastTemp = document.querySelector("#day2temp");
var dayTwoForecastWind =document.querySelector("#day2wind");
var dayTwoForecastHumidity = document.querySelector("#day2humidity");

var dayThreeForecastDate = document.querySelector("#forecast3");
var dayThreeForecastTemp = document.querySelector("#day3temp");
var dayThreeForecastWind= document.querySelector("#day3wind");
var dayThreeForecastHumidity =document.querySelector("#day3humidity");

var dayFourForecastDate = document.querySelector("#forecast4");
var dayFourForecastTemp = document.querySelector("#day4temp");
var dayFourForecastWind = document.querySelector("#day4wind");
var dayFourForecastHumidity = document.querySelector("#day4humidty");

var dayFiveForecastDate = document.querySelector("#forecast5");
var dayFiveForecastTemp = document.querySelector("#day5temp");
var dayFiveForecastWind = document.querySelector("#day5wind");
var dayFiveForecastHumidity = document.querySelector("#day5humidity");

//function that assures input is valid
function searchFormHandler(event){
    event.preventDefault();
    var searchInputText = document.querySelector("#search-input").value();
    if(!searchInputText){
        alert("Please enter a valid city name");
        return;
    }
    else{
        //call get wheather functions
    }
};

//function to display search history
function renderHistory(city){
    //console.log("clicked search");
};

//function to clear search bar
function clearSearchTerm(){
    searchInput.value = "";//val()? value()? idk
};

//function to display 5 day forecast
function displayForecast(data){
    if(data.length === 0){
        cityName.textContent = "No data found in that city";
        return;
    }
    var dayOneForecast = moment().add(1, "day").format("ddd - M/DD/YY");
    var dayTwoForecast = moment().add(2, "day").format("ddd - M/DD/YY");
    var dayThreeForecast = moment().add(3, "day").format("ddd - M/DD/YY");
    var dayFourForecast = moment().add(4, "day").format("ddd - M/DD/YY");
    var dayFiveForecast = moment().add(5, "day").format("ddd - M/DD/YY");

    

};

//funcitont to display weather data
function displayWeather(){

};


//function to display today's current weather
function renderWeatherData(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=5900db7311e0af32ad5ab7ce4fdd9244";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data, city);
            });
        }
            else{
                alert("Error" +response.statusText);
            }
    })
    .catch(function(error){
        alert("Check network connection");
    });
};

function renderForecastData(city){
    //used an all in one api so same link w different params
    var forecastUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial" + "&units=imperial" + "&appid=5900db7311e0af32ad5ab7ce4fdd9244";
    fetch(forecastUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayForecast(data);
            });
        }
        else{
            alert("Error " + response.statusText);
        }
    })
    .catch(function(error){
        alert("Check network connection");
    });
};

//event listeners////////////////////////////
searchBtn.addEventListener("click", renderHistory);
