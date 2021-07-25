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
var dayFourForecastHumidity = document.querySelector("#day4humidity");

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
        displayHistory(cityInputText);
    }
    clear(cityInputText);
};

//function to display 5 day forecast
function displayForecast(data){
    if(data.length === 0){
        cityName.textContent = "No data found in that city";
        return;
    }
    var day1Forecast = moment().add(1, "day").format("ddd - M/DD/YY");
    var day2Forecast = moment().add(2, "day").format("ddd - M/DD/YY");    
    var day3Forecast = moment().add(3, "day").format("ddd - M/DD/YY");
    var day4Forecast = moment().add(4, "day").format("ddd - M/DD/YY");
    var day5Forecast = moment().add(5, "day").format("ddd - M/DD/YY");

    var day1Temp = data.daily[1].temp.day; 
    var day1Humidity = data.daily[1].humidity;
    var day1Wind = data.daily[1].wind_speed;
    var day1Icon = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png";
    //console.log(day1Humidity);
    //console.log(day1Wind);

    var day2Temp = data.daily[2].temp.day; 
    var day2Humidity = data.daily[2].humidity;
    var day2Wind = data.daily[2].wind_speed;
    var day2Icon = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png";

    var day3Temp = data.daily[3].temp.day; 
    var day3Humidity = data.daily[3].humidity;
    var day3Wind = data.daily[3].wind_speed;
    var day3Icon = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png";

    var day4Temp = data.daily[4].temp.day; 
    var day4Humidity = data.daily[4].humidity;
    var day4Wind = data.daily[4].wind_speed;
    var day4Icon = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png";

    var day5Temp = data.daily[5].temp.day; 
    var day5Humidity = data.daily[5].humidity;
    var day5Wind = data.daily[5].wind_speed;
    var day5Icon = "http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png";
    
    dayOneForecastDate.textContent = day1Forecast;
    dayTwoForecastDate.textContent = day2Forecast;
    dayThreeForecastDate.textContent = day3Forecast;
    dayFourForecastDate.textContent = day4Forecast;
    dayFiveForecastDate.textContent = day5Forecast;

    document.getElementById("day1icon").src = day1Icon;
    //console.log(day1icon);
    document.getElementById("day2icon").src = day2Icon;
    document.getElementById("day3icon").src = day3Icon;
    document.getElementById("day4icon").src = day4Icon;
    document.getElementById("day5icon").src = day5Icon;

    dayOneForecastTemp.textContent = "Temp: " + day1Temp;
    dayOneForecastHumidity.textContent = "Humidity: " + day1Humidity;
    dayOneForecastWind.textContent = "Wind Speed: " + day1Wind;

    dayTwoForecastTemp.textContent = "Temp: " + day2Temp;
    dayTwoForecastHumidity.textContent = "Humidity " + day2Humidity;
    dayTwoForecastHumidity.textContent = "Windo Speed" + day2Wind;

    dayThreeForecastTemp.textContent = "Temp: " + day3Temp;
    dayThreeForecastHumidity.textContent = "Humidity: " + day3Humidity;
    dayThreeForecastWind.textContent = "Wind Speed: " + day3Wind;

    dayFourForecastTemp.textContent = "Temp: " + day4Temp;
    dayFourForecastHumidity.textContent = "Humidity: " +day4Humidity;
    dayFourForecastWind.textContent = "Wind Speed: " + day4Wind;

    dayFiveForecastTemp.textContent = "Temp: " + day5Temp;
    dayFiveForecastHumidity.textContent = "Humidity: " + day5Humidity;
    dayFiveForecastWind.textContent = "Wind Speed: " + day5Wind;


};

//function to display today's current weather
function fetchWeatherData(cityInputText){
    //okay so basically, you need lat and long params to use onsecall, which will be easier in the long run
    //make an initial call to fetch the current weather data for the city, THEN use the lat and long values to use the onecall api for the forecast...
    //well..now that I think about it it's all just to get the current uv index, kinda stinky but whatever
    var apiUrlLocation = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputText + "&units=imperial" + "&appid=5900db7311e0af32ad5ab7ce4fdd9244";
    fetch(apiUrlLocation).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                //console.log(data);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                //console.log(lat, lon);
                //nested api call
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +lon+ "&units=imperial" +"&appid=5900db7311e0af32ad5ab7ce4fdd9244"; 
                fetch(apiUrl).then(function(response){
                    if(response.ok){
                         response.json().then(function(data){
                             displayWeather(data, cityInputText);
                             displayForecast(data);
                             console.log(data);
                         });
                    }
                    else{
                        alert("Error " + response.statusText);
                    }
                });
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

//funciton to clear out search bar
function clear(cityInputText){
  cityInputText.value = "";  
};

//function to display search histopry
function displayHistory(cityInputText){
    cityInputText = cityInputText.toUpperCase();
    //console.log(cityInputText);
    var searchItem = document.createElement("a");
    searchItem.setAttribute("href", "#");
    searchItem.setAttribute("class", "list-group-item list-group-item-action");
    var searchItemToAdd = cityInputText;
    searchItem.setAttribute("data-city", cityInputText);
    searchItem.innerHTML = searchItemToAdd;
    var history = document.querySelector("#search-history");
    history.appendChild(searchItem);
};

//function to display currenr weather
function displayWeather(data, cityInputText){
    if(data.length === 0){
        currentDate.textContent = "No data for that city :(";
        return;
    }
    else{
        currentDate.textContent = cityInputText + moment().format(" MM/DD/YY");
        var iconUrl = "http://openweathermap.org/img/wn/" +data.current.weather[0].icon +"@2x.png";
        //http://openweathermap.org/img/wn/10d@2x.png
        //only need link for img icon
        //console.log(data.current.weather[0].icon);
        var cityTemp =   data.current.temp;
        var cityHumidity = data.current.humidity;
        var cityWind = data.current.wind_speed;
        var cityUV = data.current.uvi;
        //var uvi = parseInt($(this).attr(""))
        if(cityUV < 3.0){
             //cityUV.innerHTML = ("class = 'low'");
             currentUVIndex.className += "low";
         }
         if(cityUV > 3 && cityUV < 7){
             currentUVIndex.className += "moderate";
         }
         else if(cityUV > 7){
            currentUVIndex.className += "danger";
         }
        //console.log(cityTemp);
        
        var currentIcon = document.getElementById("icon");
        currentIcon.src = iconUrl;
        currentTemp.textContent= "Temp: " + cityTemp + " °F";
        currentHumidity.textContent = "Humidity " + cityHumidity + " %";
        currentWindSpeed.textContent = "Wind Speed: " + cityWind + " mph";
        currentUVIndex.textContent = "UV Index: " + cityUV;
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
