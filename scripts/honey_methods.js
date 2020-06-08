// randomInt
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function Sprite(source,Layer,sX,sY,sW,sH,dX,dY,dW,dH){
	var index = Images.indexOf(source);
	context[Layer].drawImage(imgA[index],sX,sY,sW,sH,dX*scale,dY*scale,dW,dH);
}

function clearBut(exception1,exception2,exception3,exception4){ // Clears all Layers but the exceptions
	for(var i=0;i<Layer.length;i++){
		if(Layer[i]!=exception1 && Layer[i]!=exception2 && Layer[i]!=exception3 && Layer[i]!=exception4)context[i].clearRect(0,0,2*cSize,2*cSize);
	}
}

// makes the berry go and the belly grow
function eatberry(){
	// Flying above berry
	if(background[pData[0]][pData[1]]==="bush_berry"){
		background[pData[0]][pData[1]]="bush_empty";
		context[1].clearRect(pData[0]*scale,pData[1]*scale,scale,scale);
		Sprite("bush_empty",1 ,0,0,100,100, pData[0],pData[1],scale,scale);
		pData[2]++;
	}
}

// Create all the eventListeners
function addEventListeners(){
	// keyboard
	document.addEventListener ('keydown', function(){controller="keyboard";progressGame(event);});
	// touchscreen
	if(OS==="phone"){
		document.getElementById("left").addEventListener("touchstart", function(){progressGame(37);});	
		document.getElementById("up").addEventListener("touchstart", function(){progressGame(38);});	
		document.getElementById("right").addEventListener("touchstart", function(){progressGame(39);});	
		document.getElementById("down").addEventListener("touchstart", function(){progressGame(40);});	
		document.getElementById("spacebar").addEventListener("touchstart", function(){progressGame(32);});	
	}
}

// Lays out a new Scene
function createWorld(){
	for(var y=0;y<gridSize;y++){
		for(var x=0;x<gridSize;x++){
			var num = [0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,4];
			var obj;
			if(x===hiveCoords[0] && y===hiveCoords[1]) obj=worldObjects[3];
			else obj=worldObjects[num[randInt(0,num.length)]];
			
			if(obj==="bush_berry") maxBush_Berry++; // Counts max amount of berry-bushes
			
			background[x][y]=obj;
		}
	}
}

// Restarts the game
function restartGame(){
	// Reset Variables
	maxBush_Berry = 0;
	hiveCoords = [randInt(0,gridSize),randInt(0,gridSize)];
	pData = [hiveCoords[0],hiveCoords[1],0,3];
	objective = "gatherBerries";
	tick = 0;
	windspeed = randInt(1,5);
	deleteAllClouds();
	
	clearBut("");
	
	createWorld();
	updateWorld();
	score();	
	gameover = false;
	
}

// Create String for debug
/*
	var string ="";
	for(var i=0;i<cloudCount;i++){
		string += " ["+cloudData[i]+"] ";
	}
	alert(string);
	*/