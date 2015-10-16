var clockTimeout = 1000;

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
  
  if (needsUpdate(currentTime.getMinutes())) {
    if (document.getElementById('clock').hasChildNodes()) {
      document.getElementById('clock').childNodes[0].innerHTML = formatOutput(currentTime.getHours(), currentTime.getMinutes());
    } else {
      var timer = document.createElement('div');
      timer.innerHTML = formatOutput(currentTime.getHours(), currentTime.getMinutes()); 
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
  
  if (needsUpdate(currentTime.getDay())) {
    
    if (document.getElementById('calendar').hasChildNodes()) {
      document.getElementById('calendar').childNodes[0].innerHTML = formatOutput(currentTime.getDay(), currentTime.getDate(), currentTime.getMonth(), currentTime.getFullYear());
    } else {
      var e = document.createElement('div');
      e.innerHTML = formatOutput(currentTime.getDay(), currentTime.getDate(), currentTime.getMonth(), currentTime.getFullYear());
      document.getElementById('calendar').appendChild(e);
    }
    
    console.log("Updated calendar");
  
  } else {
    console.log("No need to update calendar");
    return;
  }
  
}

function launchSchedules() {
  
  setInterval(updateClock, clockTimeout);
  setInterval(updateCalendar, clockTimeout);
}