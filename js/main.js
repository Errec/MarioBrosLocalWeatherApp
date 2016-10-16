$(document).ready(function(){
  var latitude, longitude, cityNameG;
  var temperature, weatherDescription, cityNameW, sunriseTime, sunsetTime;
  var currentTime = new Date().getTime() / 1000;
  var dayOrNight;

  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    latitude = data.lat;
    longitude = data.lon;
    cityNameG = data.city;
    console.log("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6521fda1207eae043017412fa964c906");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6521fda1207eae043017412fa964c906", function(data) {
        temperature = data.main.temp; // K
        weatherDescription = data.weather[0].main.toLowerCase();
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
  $("#mario-btn").css('backgroundImage', 'url(\'/img/mario-jump.png\')');
  setTimeout(function() {
    $("#mario-btn").css('backgroundImage', 'url(\'/img/mario-stand.png\')');
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

// modified from http://codepen.io/otsukatomoya/pen/gbDxF/
function makeSnow() {
  var w = window.innerWidth,
      h = window.innerHeight,
      canvas = document.getElementById('particle'),
      ctx = canvas.getContext('2d'),
      rate = 50,
      arc = 500,
      time,
      count,
      size = 2,
      speed = 10,
      lights = [],
      colors = ['#eee'];

  canvas.setAttribute('width',w);
  canvas.setAttribute('height',h);

  function init() {
    time = 0;
    count = 0;

    for(var i = 0; i < arc; i++) {
      lights[i] = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        toX: Math.random() * 5 + 1,
        toY: Math.random() * 5 + 1,
        c: colors[Math.floor(Math.random()*colors.length)],
        size: Math.random() * size
      };
    }
  }

  function bubble() {
    ctx.clearRect(0,0,w,h);

    for(var i = 0; i < arc; i++) {
      var li = lights[i];

      ctx.beginPath();
      ctx.arc(li.x,li.y,li.size,0,Math.PI*2,false);
      ctx.fillStyle = li.c;
      ctx.fill();

      li.x = li.x + li.toX * (time * 0.05);
      li.y = li.y + li.toY * (time * 0.05);

      if(li.x > w) { li.x = 0; }
      if(li.y > h) { li.y = 0; }
      if(li.x < 0) { li.x = w; }
      if(li.y < 0) { li.y = h; }
    }
    if(time < speed) {
      time++;
    }
    timerID = setTimeout(bubble,1000/rate);
  }
  init();
  bubble();
}

// modified from http://codepen.io/amwill/pen/eNMWBp/
function makeRain(dropSizeFactor, interval) {
  var canvas = document.getElementById('particle');
  var ctx = canvas.getContext('2d');

  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  var num = 300;
  var arr = [];
  var speed = 5;

  for (var i = 0; i < num; i++) {
    arr.push({
      x: Math.random() * W,
      y: Math.random() * H,
      w: 1,
      h: Math.random() * dropSizeFactor,
      s: Math.random() * 10 + 3
    });
  }

  function raindrops() {
    ctx.clearRect(0,0,W,H);
    for(var i = 0; i < num; i++) {
      ctx.fillStyle = 'rgba(158, 202, 255, 1.0)';
      ctx.fillRect(arr[i].x, arr[i].y, arr[i].w, arr[i].h);
    }
    makeItRain();
  }

  function makeItRain() {
    for(var i = 0; i< num; i++){
     arr[i].y += arr[i].s;
     if(arr[i].y >= H){
      arr[i].y =- arr[i].h;
     }
    }
  }
  setInterval(raindrops, interval);
}

function setWeatherBackground(description, dayOrNight) {
  switch(description){
    case "rain":
    case "clear":
    case "thunderstorm":
    case "snow":
    cardSnow(dayOrNight);
    break;
  }
}

function cardClear(dayOrNight) {
  $(".box-temperature").css('backgroundImage', 'url(\'/img/card-clear.png\')');
  if (dayOrNight == 1) {
    $(".box-temperature").css('background-color', '#5C94FC');
    $('.displayed-data').after('<div class="sun-wrapper"><div class="sun-inner"><img src=\'/img/sun-animated.gif\' ></div></div>');
  }
  else {
    $(".box-temperature").css('background-color', '#090F1B');
    $('.displayed-data').after('<div class="star"><img src=\'/img/star.png\' ></div>');
  }
}

function cardThunderstorm(dayOrNight) {
  $(".box-temperature").css('backgroundImage', 'url(\'/img/card-clear.png\')');
  $('.displayed-data').after('<div id="cloud-rain-1" class="cloud-rain"><img src=\'/img/cloud-rain.png\' ></div>');
  $('#cloud-rain-1').after('<div id="cloud-rain-2" class="cloud-rain"><img src=\'/img/cloud-rain.png\' ></div>');
  $('#cloud-rain-2').after('<div id="cloud-rain-3" class="cloud-rain"><img src=\'/img/cloud-rain.png\' ></div>');
  $('#cloud-rain-3').after('<div id="cloud-rain-4" class="cloud-rain"><img src=\'/img/cloud-rain.png\' ></div>');

  if (dayOrNight == 1) {
    $(".box-temperature").css('background-color', '#1528A2');
    $(".box-temperature").css('animation-name', 'thunderday');
  } else {
      $(".box-temperature").css('background-color', '#020514');
      $(".box-temperature").css('animation-name', 'thundernight');
    }

  makeRain(25,5);
}

function cardSnow(dayOrNight) {
  $(".box-temperature").css('backgroundImage', 'url(\'/img/card-snow.png\')');

  if (dayOrNight == 1) {
    $(".box-temperature").css('background-color', '#2142FF');
  } else {
      $(".box-temperature").css('background-color', '#12248D');
    }
  makeSnow();
}

function cardClouds(dayOrNight) {

}

function cardAtmosphere(dayOrNight) {

}

function cardDrizzle(dayOrNight) {

}

function cardRain(dayOrNight) {

}

function cardExtreme(dayOrNight) {

}

function cardAdditional(dayOrNight) {

}
