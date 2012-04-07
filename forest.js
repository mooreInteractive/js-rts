/* Forest Generator */
/* Adam Moore 2/14/12 */
/* M[i] - Moore Interactive */
/* Take a seed x and y value and create a starting point for a forest. 
   Then, add tree objects to each space around the seed in random order.
   Look at each tree to determine if it has open tiles and/or how many.
   Add the tree to a list of candidates if it's openess suits your needs.
   Select one at random. Add a tree to a random space around tha tile. Remove
   that space from the host tile's empty spaces. Then repeat for numTrees.*/
function forestPatch(seedx,seedy){
	var woodsInitX = seedx;//rand(7,50);
	var woodsInitY = seedy;//rand(7,50);
	var mine = new Object();
	var treeCands;
	mine.tilex = woodsInitX;
	mine.tiley = woodsInitY;
	mine.slots = new Array();
	makeSlots(4, mine.slots, mine);
	mines.push(mine);
		
	var numTrees = 150;
	for(var t = 0;t<numTrees;t++){
	var tree = new Object();
	if(mine.slots.length > 0){
		switch(rand(0,mine.slots.length-1)){
			case 0:
				var a = rand(0,mine.slots.length-1);
					tree.tilex = mine.slots[a].tilex;
					tree.tiley = mine.slots[a].tiley;
					tree.slots = new Array();
					woods.push(tree);
					mine.slots.splice(a, 1);
					makeSlots(4, tree.slots, tree);
			break;
			case 1:
				var b = rand(0,mine.slots.length-1);
					tree.tilex = mine.slots[b].tilex;
					tree.tiley = mine.slots[b].tiley;
					tree.slots = new Array();
					woods.push(tree);
					mine.slots.splice(b, 1);
					makeSlots(4, tree.slots, tree);
			break;
			case 2:
				var c = rand(0,mine.slots.length-1);
					tree.tilex = mine.slots[c].tilex;
					tree.tiley = mine.slots[c].tiley;
					tree.slots = new Array();
					woods.push(tree);
					mine.slots.splice(c, 1);
					makeSlots(4, tree.slots, tree);
			break;
			case 3:
				var d = rand(0,mine.slots.length-1);
					tree.tilex = mine.slots[d].tilex;
					tree.tiley = mine.slots[d].tiley;
					tree.slots = new Array();
					woods.push(tree);
					mine.slots.splice(d, 1);
					makeSlots(4, tree.slots, tree);
			break;
		}
	} else if(mine.slots.length == 0){
		treeCands = new Array();
		for(var w = 0;w<woods.length;w++){
			if(woods[w].slots.length > 1){treeCands.push(woods[w]);}
		}
		var newTreeNum = rand(0,treeCands.length-1);
		var tempNum = woods.indexOf(treeCands[newTreeNum]);
		var newTree = woods[tempNum];
		switch(rand(0,newTree.slots.length-1)){
			case 0:
				var a = rand(0,newTree.slots.length-1);
					tree.tilex = newTree.slots[a].tilex;
					tree.tiley = newTree.slots[a].tiley;
					tree.slots = new Array();
					woods.push(tree);
					newTree.slots.splice(a, 1);
					makeSlots(4, tree.slots, tree);
			break;
			case 1:
				var b = rand(0,newTree.slots.length-1);
					tree.tilex = newTree.slots[b].tilex;
					tree.tiley = newTree.slots[b].tiley;
					tree.slots = new Array();
					woods.push(tree);
					newTree.slots.splice(b, 1);
					makeSlots(4, tree.slots, tree);
			break;
			case 2:
				var c = rand(0,newTree.slots.length-1);
					tree.tilex = newTree.slots[c].tilex;
					tree.tiley = newTree.slots[c].tiley;
					tree.slots = new Array();
					woods.push(tree);
					newTree.slots.splice(c, 1);
					makeSlots(4, tree.slots, tree);
			break;
			case 3:
				var d = rand(0,newTree.slots.length-1);
					tree.tilex = newTree.slots[d].tilex;
					tree.tiley = newTree.slots[d].tiley;
					tree.slots = new Array();
					woods.push(tree);
					newTree.slots.splice(d, 1);
					makeSlots(4, tree.slots, tree);
			break;
		}
	}
	}
}
function checkSlots(arr){
	for(var w = 0;w<woods.length;w++){
		for(var s = 0;s<arr.length;s++){
				if((arr[s].tilex == woods[w].tilex)&&(arr[s].tiley == woods[w].tiley)){
					arr.splice(s, 1);
				}
		}
	}
	for(var m = 0;m<mines.length;m++){
		for(var s = 0;s<arr.length;s++){
				if((arr[s].tilex == mines[m].tilex)&&(arr[s].tiley == mines[m].tiley)){
					arr.splice(s, 1);
				}
		}
	}
}
function checkSprites(tile){
		var spriteLoc = 5;
		for(var s = 0;s<tile.slots.length;s++){
				if((tile.slots[s].tilex == tile.tilex)&&(tile.slots[s].tiley == tile.tiley+1)){
					spriteLoc = 8;
				}
		}
		return spriteLoc;
	
}
function makeSlots(num, arr, seed){
		for(var n = 0;n<num;n++){
		var ptile = new Object();
		switch(n){
			case 0: if((seed.tilex>0)&&(seed.tilex<side)&&(seed.tiley-1>0)&&(seed.tiley-1<side)){
					ptile.tilex = seed.tilex;
					ptile.tiley = seed.tiley - 1;
					arr.push(ptile);
				}
			break;
			case 1: if((seed.tilex>0)&&(seed.tilex<side)&&(seed.tiley+1>0)&&(seed.tiley+1<side)){
					ptile.tilex = seed.tilex;
					ptile.tiley = seed.tiley + 1;
					arr.push(ptile);
			}				
			break;
			case 2: if((seed.tilex-1>0)&&(seed.tilex-1<side)&&(seed.tiley>0)&&(seed.tiley<side)){
					ptile.tilex = seed.tilex - 1;
					ptile.tiley = seed.tiley;
					arr.push(ptile);
				}
			break;
			case 3: if((seed.tilex+1>0)&&(seed.tilex+1<side)&&(seed.tiley>0)&&(seed.tiley<side)){
					ptile.tilex = seed.tilex + 1;
					ptile.tiley = seed.tiley;
					arr.push(ptile);
				}
				checkSlots(arr);
			break;
		}
		}
	}