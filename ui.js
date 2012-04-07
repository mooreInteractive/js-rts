function drawUI(){
	//UI BG
	c2d.fillStyle   = '#232323';
	c2d.fillRect  (900,   0, 100, 500);
	c2d.strokeStyle = '#565656';
	c2d.strokeWidth = 1;
	c2d.strokeRect(900,  0, 100, 500);
	
	//Stats
	c2d.font = "15px Calibri";
    c2d.textAlign = "left";
    c2d.textBaseline = "middle";
    c2d.fillStyle = "white";
    var currGold = 'Gold: ' + gold;
    var currWood = 'Wood: ' + wood;
    c2d.fillText(currGold, 910, 8);
    c2d.fillText(currWood, 910, 23);
}
function showHarvestUI(){
	c2d.font = "15px Calibri";
    c2d.textAlign = "left";
    c2d.textBaseline = "middle";
    c2d.fillStyle = "white";
    var title = currSelection.type+'';
    var value = 'Minerals: ' + currSelection.hamt;
    //op.prepend(title + value + '<br />');
    c2d.fillText(title, 910, 110);
    c2d.fillText(value, 910, 125);
    fullUI = true;
}
function showCastleUI(){
	if(castleUI.grunt){
		var img2 = castleUI.grunt;
		c2d.drawImage(img2, 0, 0, 16, 17, img2.posx, img2.posy, 48, 48);
		if((gold>=castleUI.grunt.costg)&&(wood>=castleUI.grunt.costw)){
			c2d.strokeStyle = '#00aa00';
			c2d.fillStyle   = '#00aa00';
		} else {
			c2d.strokeStyle = '#aa0000';
			c2d.fillStyle   = '#aa0000';	
		}
		c2d.font = "10px Calibri";
		c2d.fillRect(img2.posx,img2.posy+img2.height-10, 48, 10);
		c2d.fillStyle = "black";
    	c2d.fillText(img2.costStr, img2.posx,img2.posy+img2.height-5);
		c2d.lineWidth = 1;
		c2d.beginPath();
		c2d.moveTo(img2.posx,img2.posy);  
    	c2d.lineTo(img2.posx+img2.width,img2.posy);
    	c2d.lineTo(img2.posx+img2.width,img2.posy+img2.height);
    	c2d.lineTo(img2.posx,img2.posy+img2.height);
    	c2d.lineTo(img2.posx,img2.posy);    		
    	c2d.closePath();
		c2d.stroke();
	} else {
	var img = new Image();
	img.posx  = 901;
	img.posy  = 101;
	img.costg = 100;
	img.costw = 0;	
	img.costStr = img.costg + 'g ' + img.costw + 'w';
	img.onload = function(){
		c2d.drawImage(img, 0, 0, 16, 17, img.posx, img.posy, 48, 48);
		if((gold>=castleUI.grunt.costg)&&(wood>=castleUI.grunt.costw)){
			c2d.strokeStyle = '#00aa00';
			c2d.fillStyle   = '#00aa00';
		} else {
			c2d.strokeStyle = '#aa0000';
			c2d.fillStyle   = '#aa0000';	
		}
		c2d.font = "10px Calibri";
		c2d.fillRect(img.posx,img.posy+img.height-10, 48, 10);
		c2d.fillStyle = "black";
    	c2d.fillText(img.costStr, img.posx,img.posy+img.height-5);
		c2d.lineWidth = 1;
		c2d.beginPath();
		c2d.moveTo(img.posx,img.posy);  
    	c2d.lineTo(img.posx+img.width,img.posy);
    	c2d.lineTo(img.posx+img.width,img.posy+img.height);
    	c2d.lineTo(img.posx,img.posy+img.height);
    	c2d.lineTo(img.posx,img.posy);    		
    	c2d.closePath();
		c2d.stroke();
	}
	img.src = 'assets/img/ogre.png';
	castleUI.grunt = img;
	fullUI = true;
	}
	
}