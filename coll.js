function mouseCheck(obj, mouseX, mouseY){
    if(((mouseX > obj.posx) && (mouseX <= (obj.posx + obj.width))) && ((mouseY > obj.posy) && (mouseY <= (obj.posy + obj.height))))
        return true;
    else
        return false;
}
function collCheck(obj2, obj){
    if(((obj2.posx+(obj2.width/2) > obj.posx) && (obj2.posx+(obj2.width/2) <= (obj.posx + obj.width))) && ((obj2.posy+(obj2.height/2) > obj.posy) && (obj2.posy+(obj2.height/2) <= (obj.posy + obj.height))))
        return true;
    else
        return false;
}