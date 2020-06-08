// Figur bewegen
function player(event,eventType){
	if(eventType === "object"){
		switch(event.which){
			case 37: event.preventDefault(); actions.moveLeft(); break; // left
			case 38: event.preventDefault(); actions.moveUp(); break;	// up
			case 39: event.preventDefault(); actions.moveRight(); break;// right
			case 40: event.preventDefault(); actions.moveDown(); break;	// down
			case 32: event.preventDefault(); actions.eatBerry(); break; // spacebar
		}
	}
	else if(eventType === "number"){
		switch(event){
			case 37: actions.moveLeft(); break; // left
			case 38: actions.moveUp(); break;	// up
			case 39: actions.moveRight(); break;// right
			case 40: actions.moveDown(); break;	// down
			case 32: actions.eatBerry(); break; // spacebar
		}
	}
}

var actions = {
    moveUp: function() { if(pData[1]-1>=0 && background[pData[0]][pData[1]-1]!="tree") pData[1]--; },
    moveLeft: function() { if(pData[0]-1>=0 && background[pData[0]-1][pData[1]]!="tree") pData[0]--; },
    moveRight: function() { if(pData[0]+1<=gridSize-1 && background[pData[0]+1][pData[1]]!="tree") pData[0]++; },
    moveDown: function() { if(pData[1]+1<=gridSize-1 && background[pData[0]][pData[1]+1]!="tree") pData[1]++; },
    eatBerry: function() { timestamp = timer; beeAction = "touchdown";}
};

function renderBee(){
	context[2].clearRect(0,0,cSize,cSize);
	var bobbing = 0;
	var animLength = 5;
	
	//console.log(beeAction+" "+timestamp+" "+(timestamp+animLength)+" "+timer);
	
	if(beeAction === "touchdown"){
			if(timer===Math.round(timestamp+animLength/2)) eatberry();
			//alert(timer+" "+(timestamp+animLength/2));
		if(timer<timestamp+animLength/2){
			var motion = (2/animLength)*(timer-timestamp)*scale;
			var beeY = ((pData[1]-1)*scale)+motion;
			//console.log(beeY);
		}
		else if(timer>=timestamp+animLength/2){
			var motion = -(2/animLength)*(timer-timestamp)*scale;
			var beeY = ((pData[1]+1)*scale)+motion;
			//console.log(beeY);
		}
		if(timer >= timestamp+animLength)	beeAction = "hover";
	}
	else if(beeAction === "hover"){
		var beeY = pData[1];
		var bobbingSpeed = 12;
		bobbing = 5*Math.sin((2*Math.PI)/bobbingSpeed*timer);
		beeY = ((pData[1]-1)*scale)+bobbing;
	}
	
	var index = Images.indexOf("bee");
	// The bee
	context[2].drawImage(imgA[index],0,0,100,100,pData[0]*scale,beeY,scale,scale);
	// The shadow
	if(pData[1]===0){
		context[2].clearRect(pData[0]*scale,beeY+scale,scale,scale);
		var index = Images.indexOf("indicator");
		context[2].drawImage(imgA[index],0,0,100,100,pData[0]*scale,beeY+scale,scale,scale);
	}
	context[0].beginPath();
	context[0].fillStyle = "rgba(0,0,0,0.3";
	context[0].ellipse((pData[0]+0.5)*scale,(pData[1]+0.6)*scale,15+bobbing,(15+bobbing)/2,0,2*Math.PI,0);
	context[0].fill();

}
