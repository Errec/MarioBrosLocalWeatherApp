$(document).ready(function(){
  var latitude, longitude, cityNameG;
  var temperature, weatherDescription, cityNameW;
  var openweathermapURL;

  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    latitude = data.lat;
    longitude = data.lon;
    cityNameG = data.city;

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + " &appid=5f7bcf238dc7056a7325948af9cb61be", function(data) {
        temperature = data.main.temp; // K
        weatherDescription = data.weather[0].description;
        cityNameW = data.name;

        $(".temperature").text("Temperature: " + temperature + " K");
        $(".weather").text("Weather condition: " + weatherDescription);
        $(".coords").text("lat: " + latitude + ", lon: " + longitude);
        $(".cityg").text("City-apiGeo: " + cityNameG);
        $(".cityw").text("City-apiWea: " + cityNameW);
    });
  });
});
/*
http://openweathermap.org/api
http://openweathermap.org/weather-conditions
http://stackoverflow.com/questions/8047616/get-a-utc-timestamp-in-javascript
http://stackoverflow.com/questions/28952550/how-to-convert-utc-timestamp-only-into-local-time-on-the-web-with-javascript
*/
