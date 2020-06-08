function newWorld(){
	for(var iY=0;iY<gridSize;iY++){
		background.push([]);
	}
	for(var iY=0;iY<gridSize;iY++){
		for(var iX=1;iX<gridSize;iX++){
			background[iY].push();
		}
	}
	createWorld();
	Sprite("startscreen",5 ,0,0,500,500, 0,0,screenSize,screenSize);
}

function updateWorld(){
	// Clear stuff
	clearBut("");
	// Add stuff
	renderBee();
	if(objective==="gotohive")Sprite("gotohive",3,0,0,300,300,hiveCoords[0]-1,hiveCoords[1]-1,6*scale,6*scale);
	for(var y=0;y<gridSize;y++){
		for(var x=0;x<gridSize;x++){
			if(background[x][y] != "nothing"){
				if(background[x][y]==="tree")Sprite(background[x][y],3 ,0,0,100,200, x,y-1,scale,2*scale);
				else Sprite(background[x][y],1 ,0,0,100,100, x,y,scale,scale);
			}
		}
	}
	//Sprite("bear",1 ,0,0,100,200, 0,1,scale,2*scale);
	// Manage clouds
	for(var i=0;i<cloudCount;i++){
		manageCloud(i); // Checks if the cloud is still on screen + moves it
		renderCloud(i); // Renders the cloud
	}
}