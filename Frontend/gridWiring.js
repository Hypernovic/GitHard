

var oldX = 0;
var oldY = 0;
clicking=false


wrapper.onmousedown = function (e) {
    e.preventDefault();
    if (mode=="wiring"){
    clicking=true;
    }
};



function getMouseDirection(e) {
    //deal with the horizontal case
    if (oldX < e.pageX) {
        xDirection = "right";
    } else {
        xDirection = "left";
    }

    //deal with the vertical case
    if (oldY < e.pageY) {
        yDirection = "down";
    } else {
        yDirection = "up";
    }

    oldX = e.pageX;
    oldY = e.pageY;

    return[xDirection,yDirection];
}


wrapper.onmouseup = function (e) {
    clicking=false;
};

wrapper.onmousemove = function (e) {
    e.preventDefault();
    
    if(clicking && mode=="wiring"){
        if (e.shiftKey){
            addWire(e.target,getMouseDirection(e)[1])
        }else{
            addWire(e.target,getMouseDirection(e)[0])
        }
        
        
    }
};



var tileSizeX=20
var tileSizeY=20
function wirelooks(ctx,type){
    ctx.clearRect(0, 0, tileSizeX, tileSizeY);
    ctx.beginPath();
    switch(type){
        case "horizontal":
            ctx.moveTo(0, tileSizeY/2);
            ctx.lineTo(tileSizeX, tileSizeY/2);
            break;
        

        case "vertical":
            ctx.moveTo(tileSizeX/2, 0);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            break;
        

        case "leftdown":
            ctx.moveTo(0, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            break;

        case "leftup":
            ctx.moveTo(0, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, 0);
            break;
        case "rightup":
            ctx.moveTo(tileSizeX, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, 0);
            break;

        case "rightdown":
            ctx.moveTo(tileSizeX, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            break;
            

        case "cross":
            ctx.moveTo(0, tileSizeY/2);
            ctx.lineTo(tileSizeX, tileSizeY/2);
            ctx.moveTo(tileSizeX/2, 0);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            break;

        case "downpipe":
            ctx.moveTo(0, tileSizeY/2);
            ctx.lineTo(tileSizeX, tileSizeY/2);
            ctx.moveTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            break;



        case "uppipe":
            ctx.moveTo(0, tileSizeY/2);
            ctx.lineTo(tileSizeX, tileSizeY/2);
            ctx.moveTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX/2, 0);
            break;


        case "rightpipe":
            ctx.moveTo(tileSizeX/2, 0);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            ctx.moveTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(tileSizeX, tileSizeY/2);
            break;

        case "leftpipe":
            ctx.moveTo(tileSizeX/2, 0);
            ctx.lineTo(tileSizeX/2, tileSizeY);
            ctx.moveTo(tileSizeX/2, tileSizeY/2);
            ctx.lineTo(0, tileSizeY/2);
            break;

    }
    
    ctx.stroke()

}

function alignWire(target,ctxTarget,direction){
        var targetIndex=Array.prototype.indexOf.call(allElements, target);
        abovePosition=allElements[targetIndex-columns].firstElementChild
        belowPosition=allElements[targetIndex+columns].firstElementChild
        leftPosition=allElements[targetIndex-1].firstElementChild
        rightPosition=allElements[targetIndex+1].firstElementChild
        var ctx=""

    try{
        if(rightPosition.parentElement.classList.contains("left") && direction=="left"){
            rightPosition.parentElement.classList.add("connected")
        }
    }catch{}finally{}

    try{
        if(leftPosition.parentElement.classList.contains("right") && direction=="right"){
            leftPosition.parentElement.classList.add("connected")
        }
    }catch{}finally{}

    try{
        if(belowPosition.parentElement.classList.contains("connected") && direction=="up"){
            try{
                belowPosition.parentElement.classList.replace("right","uppipe")
            }catch{
                belowPosition.parentElement.classList.replace("left","uppipe")
            }
            ctx = belowPosition.getContext("2d");
            wirelooks(ctx,"uppipe")
        }
    }catch{}finally{}


    try{
        if(abovePosition.parentElement.classList.contains("connected") && direction=="down"){
            try{
                abovePosition.parentElement.classList.replace("right","downpipe")
            }catch{
                abovePosition.parentElement.classList.replace("left","downpipe")
            }
            ctx = abovePosition.getContext("2d");
            wirelooks(ctx,"downpipe")
        }
    }catch(err){console.log(err)}finally{}

    try{
        if(belowPosition.parentElement.classList.contains("downpipe") && direction=="up"){
            belowPosition.parentElement.classList.replace("downpipe","cross")
            ctx = belowPosition.getContext("2d");
            wirelooks(ctx,"cross")
        }
    }catch{}finally{}

    try{
        if(abovePosition.parentElement.classList.contains("uppipe") && direction=="down"){
            abovePosition.parentElement.classList.replace("uppipe","cross")
            ctx = abovePosition.getContext("2d");
            wirelooks(ctx,"cross")
        }
    }catch{}finally{}


    try{
        if(abovePosition.parentElement.classList.contains("left") && direction=="down"){
            abovePosition.parentElement.classList.replace("left","rightdown")
            ctx = abovePosition.getContext("2d");
            wirelooks(ctx,"rightdown")
        }
    }catch{}finally{}

    try{
        if(belowPosition.parentElement.classList.contains("left") && direction=="up"){
            belowPosition.parentElement.classList.replace("left","rightup")
            ctx = belowPosition.getContext("2d");
            wirelooks(ctx,"rightup")
        }
    }catch{}finally{}

    try{
        if(abovePosition.parentElement.classList.contains("rightup") && direction=="down"){
            abovePosition.parentElement.classList.replace("rightup","rightpipe")
            ctx = abovePosition.getContext("2d");
            wirelooks(ctx,"rightpipe")
        }
    }catch{}finally{}

    try{
        if(belowPosition.parentElement.classList.contains("rightdown") && direction=="up"){
            belowPosition.parentElement.classList.replace("rightdown","rightpipe")
            ctx = belowPosition.getContext("2d");
            wirelooks(ctx,"rightpipe")
        }
    }catch{}finally{}

    try{
        if(rightPosition.parentElement.classList.contains("rightup") && direction=="left"){
            rightPosition.parentElement.classList.replace("rightup","uppipe")
            ctx = rightPosition.getContext("2d");
            wirelooks(ctx,"uppipe")
        }
    }catch{}finally{}

    try{
        if(rightPosition.parentElement.classList.contains("rightdown") && direction=="left"){
            rightPosition.parentElement.classList.replace("rightdown","downpipe")
            ctx = rightPosition.getContext("2d");
            wirelooks(ctx,"downpipe")
        }
    }catch{}finally{}


    try{
        if(rightPosition.parentElement.classList.contains("rightpipe") && direction=="left"){
            rightPosition.parentElement.classList.replace("rightpipe","cross")
            ctx = rightPosition.getContext("2d");
            wirelooks(ctx,"cross")
        }
    }catch{}finally{}


    //rigthPART
    try{
        if(abovePosition.parentElement.classList.contains("right") && direction=="down"){
            abovePosition.parentElement.classList.replace("right","leftdown")
            ctx = abovePosition.getContext("2d");
            wirelooks(ctx,"leftdown")
        }
    }catch{}finally{}

    try{
        if(belowPosition.parentElement.classList.contains("right") && direction=="up"){
            belowPosition.parentElement.classList.replace("right","leftup")
            ctx = belowPosition.getContext("2d");
            wirelooks(ctx,"leftup")
        }
    }catch{}finally{}

    try{
        if(abovePosition.parentElement.classList.contains("leftup") && direction=="down"){
            abovePosition.parentElement.classList.replace("leftup","leftpipe")
            ctx = abovePosition.getContext("2d");
            wirelooks(ctx,"leftpipe")
        }
    }catch{}finally{}

    try{
        if(belowPosition.parentElement.classList.contains("leftdown") && direction=="up"){
            belowPosition.parentElement.classList.replace("leftdown","leftpipe")
            ctx = belowPosition.getContext("2d");
            wirelooks(ctx,"leftpipe")
        }
    }catch{}finally{}


    try{
        if(leftPosition.parentElement.classList.contains("leftpipe") && direction=="right"){
            leftPosition.parentElement.classList.replace("leftpipe","cross")
            ctx = leftPosition.getContext("2d");
            wirelooks(ctx,"cross")
        }
    }catch{}finally{}


    try{
        if(leftPosition.parentElement.classList.contains("leftpipe") && direction=="right"){
            leftPosition.parentElement.classList.replace("leftpipe","cross")
            ctx = leftPosition.getContext("2d");
            wirelooks(ctx,"cross")
        }
    }catch{}finally{}

    
    
    
}

function wireAssembly(target,ctx,tile,direction){
    if(direction=="down" || direction=="up")
    {   
        try{
        alignWire(target,ctx,direction)
        }catch(err){
            //console.log(err)
        }finally{}
        wirelooks(ctx,"vertical")
        target.classList.add(`${direction}`);
    }
    else{
        try{
            alignWire(target,ctx,direction)
            }catch(err){
                //console.log(err)
            }finally{}
        wirelooks(ctx,"horizontal")
        target.classList.add(`${direction}`);
    }
}



function addWire(target,direction){
    if(!direction || direction=="undefined"){
        return
    }
    target.innerHTML=""
    const tile = document.createElement("canvas")
    target.appendChild(tile)
    tile.classList.add("wire");
    var ctx = tile.getContext("2d");
    tile.width  = tile.offsetWidth;
    tile.height = tile.offsetHeight;
    ctx.strokeStyle = "#FF0000";
    wireAssembly(target,ctx,tile,direction)
}
