function leftClick(mouseX, mouseY){
	unitSelected = false;
	if(currSelection == castle){
		if(mouseCheck(castleUI.grunt, mouseX, mouseY)&&(gold>=castleUI.grunt.costg)&&(wood>=castleUI.grunt.costw)){
			spawnUnit('ogre'); 
			gold -= castleUI.grunt.costg; 
			wood -= castleUI.grunt.costw;
		} else {unitSelected = false;}
		unitSelected = true;
		currSelection = castle;
		
	}
	for(var j = 0; j< level.length; j++){
		if(level[j].type != 'grass'){
		var collides = mouseCheck(level[j], mouseX, mouseY);
		//op.prepend(collides+', i.x='+level[j].image.posx+', i.y='+level[j].image.posy+', t.x='+level[j].posx+', t.y='+level[j].posy+', m.x='+mouseX+', m.y='+mouseY+'<br />');
			//unitSelected = false;
			if(collides){
				unitSelected = true;
				currSelection = level[j];
				strokeUnit(level[j]);
			}			
		}
	}
	for(var k = 0; k< currBuilds.length; k++){
		var collides = mouseCheck(currBuilds[k], mouseX, mouseY);
			//unitSelected = false;
			if(collides){
				unitSelected = true;
				currSelection = currBuilds[k];
				strokeUnit(currBuilds[k]);
			}
	}
	for(var i = 0; i< currUnits.length; i++){
		var collides = mouseCheck(currUnits[i], mouseX, mouseY);
		//unitSelected = false;
		if(collides){
			unitSelected = true;
			currSelection = currUnits[i];
		}			
	}
	if(unitSelected == false){
		currSelection = null;
		//op.append('Nothing selected.<br />');
	}
}
function rightClick(evt){
	if(currSelection){
		var e = (window.event) ? window.event : evt;
    	if(currSelection.alt != 'castle'){
    	
    	
    	var start = [];
		var dest = [];
    	for(var j = 0; j< level.length; j++){
    		var collidesU = collCheck(currSelection,level[j]);
    		if(collidesU){start = [level[j].tiley,level[j].tilex];}
    		var collidesE = mouseCheck(level[j], e.clientX - field.offsetLeft, e.clientY - field.offsetTop);
    		if(collidesE){dest = [level[j].tiley,level[j].tilex];}
    	}
    	if((start.length>0)&&(dest.length>0)){
		testPath = astar.find_path(start,dest);
		}
		//op.prepend('path.length: '+testPath.length+' start: '+start+' destination: '+dest+'<br />');    		
    	
    	for(var i = 0; i< level.length; i++){
    		var collides = false;
    		if((level[i].type == 'tree')||(level[i].type == 'mine')){
    		collides = mouseCheck(level[i], e.clientX - field.offsetLeft, e.clientY - field.offsetTop);}
			if(collides){
				currSelection.htarget = level[i];
				currSelection.destX = level[i].posx;
				currSelection.destY = level[i].posy;
				currSelection.harvesting = true;
			} else {
				currSelection.destX = e.clientX - field.offsetLeft - (currSelection.width/2);
    			currSelection.destY = e.clientY - field.offsetTop - (currSelection.width/2);
			}		
		}
    	
    	currSelection.defaultpos = false;
    	}
	}
}