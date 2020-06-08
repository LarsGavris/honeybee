
// On the first Load -> Create a new World
this.onload = function(){
	newWorld();
}

// Independent Gametimer
function step() {
	//document.getElementById("timer").innerHTML = "Timer: "+timer;
	looper++;
	if(looper===5){
		clearBut("Canvas","Action","Overlay","Game");
		
		for(var i=0;i<cloudCount;i++){
			renderCloud(i);
		}
		
		renderBee();
		waterhit("reset");
		
		ranim+=10;
		if(ranim>=100) ranim=0;
		timer++; looper=0;	
	}
	window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

// Whenever a key is pressed -> progress the game
addEventListeners();

function progressGame(event){
	// First check what controller the event came from, then
	// check if the pressed key is legal (to avoid unnecessary world-refresh)
	var eventType = typeof event;
	if(eventType === "object"){
		if(legalKeys.indexOf(event.which) != -1) goahead = true;
	}
	else if(eventType === "number"){
		if(legalKeys.indexOf(event) != -1) goahead = true;
		navigator.vibrate(30);
	}
	
	
	if(goahead === true){
		// game is on
		if(gameover === false){ 
			//////////////////////////////////////////////////////////////////////////////
			// Player
			player(event,eventType);
			waterhit();
			score();
			// World
			spawnCloud(30,70);
			updateWorld();
			// Game
			tick++;
			
			//////////////////////////////////////////////////////////////////////////////
		}
		else if(gameover === true)restartGame(); // game is over
		
		// if all berries are eaten
		if(pData[0]===hiveCoords[0] && pData[1]===hiveCoords[1] && objective==="gotohive"){
			objective = "win";
		}
		
		// you win
		if(objective === "win"){
			context[2].clearRect(0,0,cSize,cSize);
			context[5].clearRect(0,0,cSize,cSize);
			Sprite("winscreen",5,0,0,500,500,0,0,screenSize,screenSize);
			navigator.vibrate([30,50,30,50,150]);
			gameover=true;
		}
		// you loose
		else if(objective === "loss"){
			context[2].clearRect(0,0,cSize,cSize);
			context[5].clearRect(0,0,cSize,cSize);
			context[5].fillStyle = "rgba(255,0,0,0.75)";
			context[5].fillRect(0,0,11*(cSize/10),11*(cSize/10));
			Sprite("lossscreen",5,0,0,500,500,0,0,screenSize,screenSize);
			navigator.vibrate([30,50,250,50,100]);
			gameover=true;
		}
	}
	
}















