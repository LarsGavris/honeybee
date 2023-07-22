function spawnCloud(probLight,probRain){
	// Spawn light cloud
	if(cloudCount<maxCloudCount && randInt(0,100)>100-probLight){
		// Spawn new cloud
		cloudData.push([]);
		cloudData[cloudCount].push(randInt(-5,-3),randInt(0,gridSize-1),"light");
		cloudCount++;
	}
	// Spawn raincloud
	else if(cloudCount<maxCloudCount && randInt(0,100)>100-probRain){
		// Spawn new cloud
		cloudData.push([]);
		cloudData[cloudCount].push(randInt(-5,-3),randInt(0,gridSize-1),"rain");
		cloudCount++;
	}
}

function manageCloud(i){
	if(cloudData[i][0]>gridSize){
		cloudData.splice(i,1);
		cloudCount--;
	}
	else cloudData[i][0]++;
}

function renderCloud(i){
	var iI=[]; // sourceX,sourceY,sourceW,sourceH
	if(cloudData[i][2]==="light")		iI = [0,0,200,100];
	else if(cloudData[i][2]==="rain")	iI = [200,0,200,100];
	
	// the cloud
	Sprite("clouds",4, 
	iI[0],iI[1],iI[2],iI[3],
	cloudData[i][0],cloudData[i][1]-0,3*scale,1.5*scale);
	
	// the shadow
	Sprite("clouds",0, 
	iI[0],iI[1]+iI[3],iI[2],iI[3],
	cloudData[i][0],cloudData[i][1]+1.5,3*scale,1.5*scale);
	
	rain(i,iI);
}

function rain(i,iI){
	if(cloudData[i][2]==="rain"){
		Sprite("rain",4,
		0,100-ranim,400,100,
		cloudData[i][0],cloudData[i][1]+0.9,3*scale,1.6*scale);
	}
}

function deleteAllClouds(){
	cloudData.splice(0,cloudCount);
	cloudCount=0;
}

function waterhit(command){
	if(command != "reset"){
		for(var i=0;i<=cloudCount;i++){
			var cloudX = cloudData[i][0];	cloudY = cloudData[i][1];
			var playerX = pData[0];			playerY = pData[1];
			if(playerX > cloudX && playerX <= cloudX+3 && playerY === cloudY+2 && cloudData[i][2]==="rain"){
				pData[3]--;
				navigator.vibrate([150]);
				waterhitStamp = timer;
				document.getElementById("health").style.backgroundColor = "rgba(255,0,0,0.75)";
			}
		}	
	}
	else if(command === "reset"){
		if(timer===waterhitStamp+1){
			document.getElementById("health").style.backgroundColor = "rgba(255,0,0,0)";
		}
	}
}