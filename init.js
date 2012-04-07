var op,	currSelection, unitSelected, field, bg, c2d, currUnits, currBuilds,	level, castle,
	castleUI, fullUI, gLoop, gold, mapSize, side, homeTile,	grass, tree, imgReady, woods, mines, 
	all, astar, astarBoard, frameMouseX, frameMouseY, wood, testPath, debug;
		
$(document).ready(function(){
	op = $('#output');
	mapSize = 10000;
	side = Math.sqrt(mapSize);
	unitSelected = false;
	castleUI = new Object();
	field = document.getElementById('container');
	c2d = field.getContext('2d');
	currUnits = new Array();
	currBuilds = new Array();
	level = new Array();
	gold = 300;
	wood = 0;
	homeTile = 61;
	mines = new Array();
	woods = new Array();
	all = new Array();
	astarBoard = new Array();
	debug = false;
	for(var asb=0;asb<side;asb++){
		astarBoard[asb] = new Array();
	}
	forestPatch(30,15);
	forestPatch(rand(10,95),rand(10,95));
	forestPatch(rand(10,95),rand(10,95));
	forestPatch(rand(10,95),rand(10,95));
	forestPatch(rand(10,95),rand(10,95));
	forestPatch(rand(10,95),rand(10,95));
	fullUI = false;
	
	loadImages();
	createLevel();
	disableContextMenu(field);
	GameLoop();

	$('#container').click(function(event){
		var mouseX = event.pageX - this.offsetLeft,
    	mouseY = event.pageY - this.offsetTop;
    	leftClick(mouseX, mouseY);
	});	
	$('#container').mousemove(function(event){
		frameMouseX = event.pageX - this.offsetLeft;
		frameMouseY = event.pageY - this.offsetTop;
	});
	
});
function loadImages(){
	grass = new Image();
	grass.onload = function(){c2d.drawImage(grass, -20, -20);}
	grass.src = 'assets/img/grass.png';
	
	tree = new Image();
	tree.onload = function(){c2d.drawImage(tree, -50, -50);}
	tree.src = 'assets/img/tree.png';
	
	mine = new Image();
	mine.onload = function(){c2d.drawImage(mine, -20, -20);}
	mine.src = 'assets/img/mine.png';
}
//function castleUI (){return true;}
function disableContextMenu(element) {
    element.oncontextmenu = function(e) {
    	if (e){e.stopPropagation();}
       rightClick(e);
       return false;
    }
}
function GameLoop(){  
	  clear();
	  changePosition();
	  drawMap();
	  moveUnits(); 
	  drawFrame();  
	  gLoop = setTimeout(GameLoop, 1000 / 50);
	}
function clear(){
	all = [];
	/*var astarCount = 0;
		for(var lx=0;lx<side-1;lx++){
			for(ly=0;ly<side-1;ly++){
				if(level[astarCount].type != 'grass'){
					astarBoard[lx][ly] = 1;
				} else {
					astarBoard[lx][ly] = 0;
				}
				astarCount++;
			}
		}*/
	for(var cu = 0; cu<currUnits.length; cu++){
		all.push(currUnits[cu]);
	}
	for(var cb = 0; cb<currBuilds.length; cb++){
		all.push(currBuilds[cb]);
	}
	for(var l = 0; l<level.length; l++){
		all.push(level[l]);
	}
	if(fullUI == true){
		c2d.clearRect(0, 0, field.width-100, field.height);
		c2d.clearRect(field.width-100, 0, 100, 100);
	} else{
		c2d.clearRect(0, 0, field.width, field.height);
	}
}
function changePosition(){
	if((frameMouseX<50)&&(frameMouseX>0)&&(level[0].posx<0)){
		for(var a = 0; a<all.length; a++){
			all[a].posx += 5;
			if(all[a].destX){all[a].destX += 5;}
		}
	} else if ((frameMouseX>850)&&(frameMouseX<900)&&(level[mapSize-1].posx>900-16)){
		for(var a = 0; a<all.length; a++){
			all[a].posx -= 5;
			if(all[a].destX){all[a].destX -= 5;}
		}
	}
	if((frameMouseY<50)&&(frameMouseY>0)&&(level[0].posy<0)){
		for(var a = 0; a<all.length; a++){
			all[a].posy += 5;
			if(all[a].destY){all[a].destY += 5;}
		}
	} else if ((frameMouseY>450)&&(frameMouseY<500)&&(level[mapSize-1].posy>500-16)){
		for(var a = 0; a<all.length; a++){
			all[a].posy -= 5;
			if(all[a].destY){all[a].destY -= 5;}
		}
	}
}
function drawMap(){
	for(var i = 0; i<level.length; i++){
		if((level[i].posx>-16)&&(level[i].posx<916)&&(level[i].posy>-16)&&(level[i].posy<516)){
		switch(level[i].type){
			case 'grass':c2d.drawImage(level[i].image, level[i].posx, level[i].posy);
			break;
			case 'tree': var treeTile = woods[level[i].treeNum];
						if(treeTile){
						 checkSlots(treeTile.slots);
						 switch(checkSprites(treeTile)){
						 case 5: c2d.drawImage(grass, level[i].posx, level[i].posy);
						 c2d.drawImage(level[i].image, 16, 16, 16, 16, level[i].posx, level[i].posy, 16, 16);
						 break;
						 case 8: c2d.drawImage(grass, level[i].posx, level[i].posy);
						 c2d.drawImage(level[i].image, 16, 32, 16, 16, level[i].posx, level[i].posy, 16, 16);
						 break;
						}}
			break;
			case 'butte':c2d.fillStyle = '#663300';
						 c2d.fillRect(level[i].posx,level[i].posy,16,16);
			break;
			case 'castle':c2d.fillStyle = '#aaaaaa';
						 c2d.fillRect(level[i].posx,level[i].posy,16,16);
			break;
			case 'water':c2d.fillStyle = '#3300ff';
						 c2d.fillRect(level[i].posx,level[i].posy,16,16);
			break;
			case 'mine':c2d.fillStyle = '#ffcc00';
						 c2d.drawImage(level[i].image, level[i].posx, level[i].posy);
			break;
		}
		}
	}
}
function moveUnits(){
	for(var i = 0; i<currUnits.length; i++){
		var ax = currUnits[i].posx;
		var ay = currUnits[i].posy;
		var bx = currUnits[i].destX;
		var by = currUnits[i].destY;
		
		var vx = bx - ax;
		var vy = by - ay;
		
		var vlength = Math.sqrt(vx*vx + vy*vy); 
		if(vlength > 1){
		vx /= vlength;
		vy /= vlength;
		currUnits[i].posx += vx;
		currUnits[i].posy += vy;
		}
		
		
					
	}
	checkHarvest();
} 
function drawFrame(){
	for(var j = 0; j<currBuilds.length; j++){
		if(currBuilds[j] == castle){
		c2d.drawImage(castle, castle.posx, castle.posy);
		} else {c2d.drawImage(currBuilds[j].image, currBuilds[j].posx, currBuilds[j].posy);}
		if((currSelection)&&(currSelection == currBuilds[j])){
			strokeUnit(currBuilds[j]);
		}
	}
	for(var l = 0; l<level.length; l++){
		if((currSelection)&&(currSelection == level[l])){
			strokeUnit(level[l]);
		}
		if(testPath){
			if(debug){
				for(var abx=0;abx<astarBoard.length;abx++){
					for(var aby=0;aby<astarBoard[abx].length;aby++){
					if((abx == level[l].tiley)&&(aby == level[l].tilex)){
						if(astarBoard[abx][aby] == 1){c2d.fillStyle = '#3300ff';}
						else {c2d.fillStyle = '#ff0000';}
					c2d.fillRect(level[l].posx+5,level[l].posy+5,6,6);
					}
				}
				}}
					for(var p=0;p<testPath.length;p++){
						c2d.fillStyle = '#3300ff';
						if((testPath[p].x == level[l].tiley)&&(testPath[p].y == level[l].tilex)){
						c2d.fillRect(level[l].posx,level[l].posy,16,16);
						}
					}
		}
	}
	for(var i = 0; i<currUnits.length; i++){
		if(currUnits[i].alt == 'ogre'){
		c2d.drawImage(currUnits[i], 0, 0, 16, 17, currUnits[i].posx, currUnits[i].posy, 16, 17);	
		} else {
		c2d.drawImage(currUnits[i], currUnits[i].posx, currUnits[i].posy);
		}
		if((currSelection)&&(currSelection == currUnits[i])){
			strokeUnit(currUnits[i]);
		}
	}
	drawUI();
	if(currSelection == castle){showCastleUI();}
	if(currSelection){
	switch(currSelection.type){
		case 'mine':showHarvestUI();
		break;
		case 'tree':showHarvestUI();
		break;
	}}
	
}
function checkHarvest(){
	for(var i=0;i<currUnits.length;i++){
		if(currUnits[i].harvesting){
			if(collCheck(currUnits[i], currUnits[i].htarget)&&(currUnits[i].htarget.hamt >0)){
				currUnits[i].harvesting = true;
				currUnits[i].harvested += 1;
				currUnits[i].htarget.hamt -= 1;
				if(currUnits[i].harvested >= 100){
					currUnits[i].harvested = 100;
					currUnits[i].destX = castle.posx;
					currUnits[i].destY = castle.posy;
				}
				if(currUnits[i].htarget.hamt <= 0){
					currUnits[i].htarget.type = 'grass';
					currUnits[i].htarget.image = grass;
					currUnits[i].destX = castle.posx;
					currUnits[i].destY = castle.posy;					
					woods.splice(woods.indexOf(currUnits[i].htarget),1);
				}
			} else if(collCheck(currUnits[i], castle)){
				if(currUnits[i].harvested >= 1){
					wood += currUnits[i].harvested;
					if(currUnits[i].harvested<100){currUnits[i].harvesting = false;}
					currUnits[i].harvested = 0;
					if(currUnits[i].htarget){
						currUnits[i].destX = currUnits[i].htarget.posx;
						currUnits[i].destY = currUnits[i].htarget.posy;
					}
				}
			}
		}
	}
}
function strokeUnit(unit){
			c2d.strokeStyle = '#000000';
			c2d.lineWidth = 1;
			c2d.beginPath();
			c2d.moveTo(unit.posx,unit.posy);  
    		c2d.lineTo(unit.posx+unit.width,unit.posy);
    		c2d.lineTo(unit.posx+unit.width,unit.posy+unit.height);
    		c2d.lineTo(unit.posx,unit.posy+unit.height);
    		c2d.lineTo(unit.posx,unit.posy);
    		c2d.closePath();
			c2d.stroke();
}
function spawnUnit(unit){
	var numAtBase = 0;
	for(var i = 0;i<currUnits.length;i++){
		if(currUnits[i].defaultpos == true){numAtBase += 1;}		
	}
	switch(unit){
		case 'ogre':
			 var img = new Image();
	  		 img.alt = unit;
	  		 img.gname = unit + '_' + currUnits.length;
	  		 img.id = img.gname;
	  		 img.defaultpos = true;
	  		 img.posx  = castle.posx + (16*numAtBase);
	  		 img.posy  = castle.posy + castle.height;
	  		 img.destX = img.posx;
	  		 img.destY = img.posY;
	  		 img.width = 16;
	  		 img.height = 17;
	  		 img.htarget = null;
	  		 img.harvesting = false;
	  		 img.harvested = 0;
	  		 img.path = new Array();
	  		 img.onload = function(){c2d.drawImage(img, 0, 0, 16, 17, img.posx, img.posy, 16, 17);}
	  		 currUnits.push(img);
	  		 img.src = 'assets/img/ogre.png';
		break;
		case 'castle':
			 var img = new Image();
	  		 img.alt = unit;
	  		 img.gname = unit + '_' + currBuilds.length;
	  		 img.id = img.gname;
	  		 img.posx  = level[203].posx;
	  		 img.posy  = level[203].posy;
	  		 img.destX = img.posx;
	  		 img.destY = img.posY;
	  		 img.width = 48;
	  		 img.height = 48;
	  		 img.onload = function(){c2d.drawImage(img, img.posx, img.posy);}
	  		 currBuilds.push(img);
	  		 castle = img;
	  		 img.src = 'assets/img/castle.png';
		break;
		default:op.append('Something was supposed to spawn, but didnt. :(<br />');
		break;
	}
}
function createLevel(){
	var forest = woods;
	for(var i=0;i<mapSize;i++){
		var x = i%side;
		var y = Math.floor(i/side);
		var num = i;
		var type = '';
		var treeNum = -1;
		for(var j=0;j<forest.length;j++){
			if((x == forest[j].tilex)&&(y == forest[j].tiley)){type = 'tree'; treeNum = j;}
		}
		for(var k=0;k<mines.length;k++){
			if((x == mines[k].tilex)&&(y == mines[k].tiley)){type = 'mine';}
		}
		if(type == ''){
		switch(rand(0,5)){
			case 0:type = 'grass';
			break;
			case 1:type = 'grass';
			break;
			case 2:type = 'grass';
			break;
			case 3:type = 'grass';
			break;
			case 4:type = 'grass';
			break;
			case 5:type = 'grass';
			break;
		}}
		if(type != 'grass'){	
					astarBoard[y][x] = 1;
				} else {
					astarBoard[y][x] = 0;
				}
		var tile = new Tile(x,y,type,num,0,treeNum);
		level.push(tile);
		if(i == mapSize-1){spawnUnit('castle');astar = new AStar(astarBoard);}
	}
}
function Tile(tilex,tiley,type,num,weight,treeNum){
	this.tilex = tilex;
	this.tiley = tiley;
	this.posx = tilex*16;
	this.posy = tiley*16;
	this.width = 16;
	this.height = 16;
	this.type = type;
	this.num = num;
	this.image = new Image();
	this.treeNum = treeNum;
	this.spriteLoc = 5;
	switch(this.type){
		case 'tree': this.weight = 1;this.hamt = rand(300, 900);
						 this.image.src = tree.src;
						 this.image.posx = this.posx;
						 this.image.posy = this.posy;
		break;
		case 'water': this.weight = 1;
		break;
		case 'butte': this.weight = 1;
		break;
		case 'mine': this.weight = 1;this.hamt = rand(300, 900);
						 this.image.src = mine.src;
						 this.image.posx = this.posx;
						 this.image.posy = this.posy;
		break;
		case 'grass': this.weight = 0;this.image.src = grass.src;
		break;
		default: this.weight = 0;
		break;
	}	
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}