var cityInput = document.querySelector("#city");
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
function searchButtonHandler(event){
    event.preventDefault();
    var cityInputText = document.querySelector("#search-input").value;
    if(!cityInputText){
        alert("Please enter a city name");
        return;
    }
    else{
        //console.log(cityInputText);
        //call getwhather functions
        fetchWeatherData(cityInputText);
    }
    
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

//function to display today's current weather
function fetchWeatherData(cityInputText){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputText + "&units=imperial" + "&appid=5900db7311e0af32ad5ab7ce4fdd9244";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data, cityInputText);
                console.log(data);
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

//function to display currenr weather
function displayWeather(data){
    if(data.length === 0){
        currentDate.textContent = "No data for that city :(";
        return;
    }
    else{
        currentDate.textContent = data.name + moment().format(" MM/DD/YY");
        var currentIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        document.getElementById("icon").src = currentIcon;
    }
};

function fetchForecastData(cityInputText){
    //used an all in one api so same link w different params
    var forecastUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputText +"&units=imperial" + "&units=imperial" + "&appid=5900db7311e0af32ad5ab7ce4fdd9244";
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

//event listeners////////////////////////////////////////////
searchBtn.addEventListener("click", searchButtonHandler);
//history.addEventListener("click", )
