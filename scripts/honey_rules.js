function rules(){
	for(var i=0;i<=cloudCount;i++){
		var cloudX = cloudData[i][0];	cloudY = cloudData[i][1];
		var playerX = pData[0];			playerY = pData[1];
		if(playerX > cloudX && playerX <= cloudX+3 && playerY === cloudY+2 && cloudData[i][2]==="rain"){
			pData[3]--;
		}
	}
}