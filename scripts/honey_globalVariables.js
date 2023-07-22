// These variables can be accessed by any function

var OS = "pc"; // Is it a pc or a phone?
if(screen.width<1100) OS = "phone";
	
// Site-Layout related
var mainWidth = document.body.clientWidth;
var mainHeight = document.body.clientHeight;


// Controls
if(OS==="phone"){
	if(mainWidth <= mainHeight) 		{var screenSize = mainWidth;}
	else if(mainWidth > mainHeight) 	{var screenSize = mainHeight;}
	
	function makeDiv(ParentClass,ChildId,ChildClass){
		var iDiv = document.createElement("div");
		if(typeof ChildId === "string")iDiv.id=ChildId; 
		if(typeof ChildClass === "string")iDiv.className=ChildClass;
		document.getElementsByClassName(ParentClass)[0].appendChild(iDiv);
	}
	// Create controls for control-interface (and all sub-divs)
	makeDiv("footer","controls","controls");
	makeDiv("controls",null,"eat");
	makeDiv("eat","spacebar",null);
	makeDiv("controls",null,"move");
	makeDiv("move","up",null);
	makeDiv("move","left",null);
	makeDiv("move","right",null);
	makeDiv("move","down",null);
	
	// Set the controls into position
	var headerHeight = document.getElementById("header").offsetHeight;
	var controlsHeight = mainHeight-screenSize-headerHeight;
	var controls = document.getElementById("controls").style;
	controls.height = controlsHeight+"px";
	controls.width = mainWidth+"px";
	
	var eat = document.getElementsByClassName("eat")[0].style;
	eat.height = controlsHeight+"px";
	eat.width = mainWidth/2+"px";
	var spacebar = document.getElementById("spacebar").style;
	spacebar.height = eat.height;
	spacebar.width = eat.width;
	
	var move = document.getElementsByClassName("move")[0].style;
	move.height = eat.height; move.width = eat.width; 
	var buttonSize = controlsHeight/3+"px";
	var up = document.getElementById("up").style;
	var left = document.getElementById("left").style;
	var right = document.getElementById("right").style;
	var down = document.getElementById("down").style;
	up.height=buttonSize; left.height=up.height; right.height=up.height; down.height=up.height;
	up.width=move.width; down.width=up.width;
	left.width=mainWidth/4+"px";right.width=left.width;
}
else if(OS==="pc"){
	if(mainWidth <= mainHeight) 		{var screenSize = 9*(mainWidth/10);}
	else if(mainWidth > mainHeight) 	{var screenSize = 9*(mainHeight/10);}
}

document.getElementById("screen").style.width = screenSize+"px";
document.getElementById("screen").style.height = screenSize+"px";
document.getElementById("body").style.height = screenSize+"px";

// Canvas related

var Layer = ["Shade","Canvas","Action","Overlay","Cloud","Game"];
var context = [];
for(var i=0;i<Layer.length;i++){
	var obj = document.getElementById(Layer[i]);
	context.push(obj.getContext('2d'));
	// Set all Canvases to body-size
	obj.width = screenSize;
	obj.height = screenSize;
}

var cSize = Math.floor(screenSize/10)*10;
var gridSize = 10;
var scale = Math.floor(cSize/gridSize); 


var Images = ["bee","berry","bush_berry","bush_empty","tree","clouds","gotohive","hive","lawn","rain","startscreen","winscreen","lossscreen","bear","indicator"];
var imgA = [];
for(var i=0;i<Images.length;i++){
	var tempImg = new Image();
	tempImg.src = "./graphics/"+Images[i]+".png";
	imgA.push(tempImg);
}



// Gameloop related
var gameover = false;
var tick = 0;
var timer = 0; looper = 0;
var eventType = typeof event;

// Vibration
// enable vibration support
navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

if (navigator.vibrate) {
	navigator.vibrate([50,100,50]);
}

// World related
var img = new Image();
var background = [[]];
var worldObjects = ["nothing","bush_empty","bush_berry","hive","tree"];
var maxBush_Berry = 0;
var windspeed = randInt(1,5);
var cloudCount = 0; maxCloudCount = 14;
var cloudData = [[]];  // PosX,PosY,type
var ranim = 0;

// Player related
var waterhitStamp = 0;
var timestamp = 0;
var beeAction = "hover";
document.getElementById("health").style.backgroundColor = "rgba(255,0,0,0)";
var legalKeys = [32,37,38,39,40];
var hiveCoords = [randInt(0,gridSize),randInt(0,gridSize)]; // Also the Startcoordinates
var pData = [hiveCoords[0],hiveCoords[1],0,3]; // xCoord,yCoord,eatenBerries,health
var objective = "gatherBerries";
