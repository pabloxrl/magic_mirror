function updateClock() {
  
  this.needsUpdate = function (now) {
    
    if (this.previous !== now) {
      this.previous = now;
      
      return true;
    }
    
    return false;
  }
  
  this.formatOutput = function(hour, minutes) {
    if (minutes < 10) { minutes = "0" + minutes; }
    return hour + ":" + minutes;
  };
  
  var currentTime = new Date();
  
  if (this.needsUpdate(currentTime.getMinutes())) {
    
    if (document.getElementById('clock').hasChildNodes()) {
      document.getElementById('clock').childNodes[0].innerHTML = this.formatOutput(currentTime.getHours(), currentTime.getMinutes());
    } else {
      var timer = document.createElement('div');
      timer.innerHTML = this.formatOutput(currentTime.getHours(), currentTime.getMinutes()); 
      document.getElementById('clock').appendChild(timer);
    }
  
    console.log("Updated clock");
    
  } else {
    console.log("No need to update clock");
  }
}

var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
function updateCalendar() {
  
  this.needsUpdate = function (today) {
    
    if (this.previous !== today) {
      this.previous = today;
      
      return true;
    }
    
    return false;
  }
  
  this.formatOutput = function(day, date, month, year) {
    
    var ordinal = 'th';
    
    if (date == 1 || date == 21) {
      ordinal = 'st';
    } else if (date == 2 || date == 22) {
      ordinal = 'nd';
    } else if (date == 3 || date == 23) {
      ordinal = 'rd';
    }
    
    return dayNames[day] + ", " + date + ordinal + " of " + monthNames[month] + " " + year; 
  };
  
  var currentTime = new Date();
  
  if (this.needsUpdate(currentTime.getDay())) {
    
    if (document.getElementById('calendar').hasChildNodes()) {
      document.getElementById('calendar').childNodes[0].innerHTML = formatOutput(currentTime.getDay(), currentTime.getDate(), currentTime.getMonth(), currentTime.getFullYear());
    } else {
      var e = document.createElement('div');
      e.innerHTML = this.formatOutput(currentTime.getDay(), currentTime.getDate(), currentTime.getMonth(), currentTime.getFullYear());
      document.getElementById('calendar').appendChild(e);
    }
    
    console.log("Updated calendar");
  
  } else {
    console.log("No need to update calendar");
    return;
  }
}

function updateWeather() {
  
  this.updateNode = function (id, information) {
    
    var root = document.getElementById(id);
    
    if (!root.hasChildNodes()) {
      var e = document.createElement('div');
      root.appendChild(e);
    }
    
    root.childNodes[0].innerHTML = information;
  }
  
  this.formatOutput = function (data) {
    
    this.updateNode('city', data.name);
    this.updateNode('icon', data.weather[0].icon);
    this.updateNode('temperature', Math.round(data.main.temp) + '°C');
    this.updateNode('summary', data.weather[0].main);
    this.updateNode('maxmin_temp', 'min: ' + Math.round(data.main.temp_min) + '°C / max: ' + Math.round(data.main.temp_max) + '°C');
  }

  $.ajax({
    dataType    : "jsonp",
    url         : 'http://api.openweathermap.org/data/2.5/weather?q=Tychy&units=metric&APPID=9e19774d951adb24a6e02b9b8b48d9df',
    success     : function (data) { formatOutput(data); }
  });
}

function launchSchedules() {
  
  var ONE_SECOND_TIMEOUT = 1000;
  var ONE_HOUR_TIMEOUT = 60 * 60 * ONE_SECOND_TIMEOUT;
  
  setInterval(updateClock, ONE_SECOND_TIMEOUT);
  setInterval(updateCalendar, ONE_SECOND_TIMEOUT);
  
  updateWeather();
  setInterval(updateWeather, ONE_HOUR_TIMEOUT);
}