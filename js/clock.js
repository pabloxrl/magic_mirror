var Clock = (function () {
  
  var updatePeriod = 10000; //milliseconds
  var displayNode;
  
  var myPrivateVar, myPrivateMethod;
  
  display = function (time, date) {
    
    var div = document.getElementById("top_right");
    console.log(time.hour + ":" + time.minutes);
    console.log(date.day + "/" + date.month + "/" + date.year);  
  }
  
  update = function () {
    var date = new Date();
    
    display(
        {
          hour : date.getHours(),
          minutes : date.getMinutes()
        },
        {
          day : date.getDay(),
          month : date.getMonth(),
          year : date.getFullYear()
        }
    );
  }
  
  launchTimer = function () {
    update();
    
    setInterval(function(){ update(); }, updatePeriod);
  }
  
  return { 
    // Public interface
    initialize : function (node) {
      displayNode = node;
      
      launchTimer();
    }
  };
 
})();