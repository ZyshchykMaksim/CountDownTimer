# Countdown Timer #

    var timer = new Countdowntimer(60); //60 seconds    
    timer.start();
	
	timer.onTick(function (sec) {
    	console.log(sec);
    }); 
   
    timer.onEnd(function () {
    	console.log('finish');
    	timer.refresh();
    });    
    
