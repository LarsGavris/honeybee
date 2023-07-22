function score(){
	document.getElementById("health").innerHTML = pData[3]+"/3";
	document.getElementById("points").innerHTML = pData[2]+"/"+maxBush_Berry;
	if(pData[2]===maxBush_Berry) {
		objective = "gotohive";
	}
	if(pData[3]<=0){
		objective = "loss";
	}
}