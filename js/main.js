$(document).ready(function(){
  var latitude, longitude, cityNameG;
  var temperature, weatherDescription, cityNameW, sunriseTime, sunsetTime;
  var currentTime = new Date().getTime() / 1000;
  var DayNight;

  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    latitude = data.lat;
    longitude = data.lon;
    cityNameG = data.city;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6521fda1207eae043017412fa964c906", function(data) {
        temperature = data.main.temp; // K
        weatherDescription = data.weather[0].description;
        cityNameW = data.name;
        sunriseTime = data.sys.sunrise;
        sunsetTime = data.sys.sunset;

        if (currentTime > sunriseTime && currentTime < sunsetTime) {
          DayNight = "Day";
        } else { DayNight = "Night";}

        $(".temperature").text(Math.round(temperature - 273.15) + "°C");

        setTimeout(function() {
          marioJump();
          $("#brick-btn").css('backgroundImage', 'url(\'/img/btn-temp-f.png\')');
        }, 300);

        var showCelsius = true;
        $('.btn').on('click', function(){
          marioJump();
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
/*
http://openweathermap.org/api
http://openweathermap.org/weather-conditions
http://stackoverflow.com/questions/8047616/get-a-utc-timestamp-in-javascript
http://stackoverflow.com/questions/28952550/how-to-convert-utc-timestamp-only-into-local-time-on-the-web-with-javascript
*/
