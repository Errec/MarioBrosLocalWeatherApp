$(document).ready(function(){
  var latitude, longitude, cityNameG;
  var temperature, weatherDescription, cityNameW, sunriseTime, sunsetTime;
  var currentTime = new Date().getTime() / 1000;
  var dayOrNight;

  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    latitude = data.lat;
    longitude = data.lon;
    cityNameG = data.city;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6521fda1207eae043017412fa964c906", function(data) {
        temperature = data.main.temp; // K
        weatherDescription = data.weather[0].main.toLowerCase();;
        cityNameW = data.name;
        sunriseTime = data.sys.sunrise;
        sunsetTime = data.sys.sunset;
        dayOrNight = currentTime > sunriseTime && currentTime < sunsetTime; // day: true, night: false

        $(".temperature").text(Math.round(temperature - 273.15) + "°C");

        setWeatherBackground(weatherDescription, dayOrNight);
        setTimeout(function() {
          marioJump();
          $("#brick-btn").css('backgroundImage', 'url(\'/img/btn-temp-f.png\')');
        }, 500);

        var showCelsius = true;
        $('.btn').on('click', function(){
          marioJump();
          showCelsius = convertTemp(temperature, showCelsius);
        });
        $(".cityg").text(cityNameG);
    });
  });
});

function marioJump() {
  $('#mario-btn').effect( "bounce", {times:1}, 350 );
  $("#mario-btn").css('backgroundImage', 'url(\'/img/mario1B.png\')');
  setTimeout(function() {
    $("#mario-btn").css('backgroundImage', 'url(\'/img/mario1A.png\')');
  }, 350);
  setTimeout(function() {
    $('#brick-btn').effect( "bounce", {times:1}, 350 ).delay(700);
  }, 100);
}

function convertTemp(temperature, showCelsius) {
  if(showCelsius === false) {
  $(".temperature").text(Math.round(temperature - 273.15) + "°C");
  $("#brick-btn").css('backgroundImage', 'url(\'/img/btn-temp-f.png\')');
  showCelsius = true;
  }
  else {
    $(".temperature").text(Math.round(temperature * 9 / 5 - 459.67) + "°F");
      $("#brick-btn").css('backgroundImage', 'url(\'/img/btn-temp-c.png\')');
      showCelsius = false;
  }
  return showCelsius;
}

function setWeatherBackground(description, dayOrNight) {
    switch(description){
      case "clear sky":
      case "few clouds":
        if (dayOrNight == 1) {
          $(".box-temperature").css('backgroundImage', 'url(\'/img/marioSunny.png\')');
        }
        else {
          $(".box-temperature").css('backgroundImage', 'url(\'/img/marioNight.png\')');
        }
        break;

      case "shower rain":
      case "rain":
      case "thunderstorm":
        $(".box-temperature").css('backgroundImage', 'url(\'/img/marioRain.png\')');
        break;

      case "snow":
        $(".box-temperature").css('backgroundImage', 'url(\'/img/marioSnow.png\')');
  }
}
/*
http://openweathermap.org/api
http://openweathermap.org/weather-conditions
http://stackoverflow.com/questions/8047616/get-a-utc-timestamp-in-javascript
http://stackoverflow.com/questions/28952550/how-to-convert-utc-timestamp-only-into-local-time-on-the-web-with-javascript
*/
