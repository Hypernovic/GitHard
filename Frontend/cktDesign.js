
itemClicked=""
canvasWidth=""
canvasHeight=""


function componentDesign(){
    $(`.components-in`).empty();
    $(`.components-in`).append(
        `<div id="attached">
            <button type="button" id="resistor" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Resistor</button>
            
            <button type="button" id="diode" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Diode</button>

            <button type="button" id="zener" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Zener</button>

            <button type="button" id="GND" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">GND</button>

            <button type="button" id="capacitor" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Capacitor</button>
        </div>
        `
      );

    itemClicked="GND"
    itemCanvas(itemClicked)
}

function boardDesign(){
    $(`.components-in`).empty();
    $(`.components-in`).append(
        `<div id="attached">

            <button type="button" id="board-1" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Board-1</button>
            
            <button type="button" id="board-2" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Board-2</button>

            <button type="button" id="board-3" class="btn btn-dark" draggable="true" 
            ondragstart="itemDragStart(this)" ondragover="itemDragOver(this)" ondragleave="itemDragLeave(this)">Board-3</button>

        </div>
        `
      );

      itemClicked="board-3"
      itemCanvas(itemClicked)
}


function drawComponent(ctx,item){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    switch(item){
        case"resistor":
            ctx.moveTo(0, canvasHeight/2);
            ctx.lineTo(canvasWidth*(2/10), canvasHeight/2);



            var startX = canvasWidth*(20/100);
            var startY =canvasHeight/2 + canvasHeight*(20/100);
            var zigzagSpacing = (canvasWidth*(60/100))/12;
        
            ctx.moveTo(startX, startY);
            
            for (var n = -2; n < 12; n++) {
                var x = startX + ((n + 1) * zigzagSpacing);
                var y;
                if (n % 2 == 0) { // if n is even...
                    y = startY;
                }
                else { // if n is odd...
                    y = canvasHeight/2 - canvasHeight*(20/100);;
                }
                ctx.lineTo(x, y);
            }

            ctx.moveTo(canvasWidth*(80/100), canvasHeight*(50/100));
            ctx.lineTo(canvasWidth*(100/100), canvasHeight*(50/100));

            break
        case"diode":
            
            ctx.moveTo(0, canvasHeight/2);
            ctx.lineTo(canvasWidth*(2/10), canvasHeight/2);

            ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(2/10), canvasHeight*(8/10));

            ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(8/10), canvasHeight*(2/10));

            ctx.moveTo(canvasWidth*(8/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(8/10), canvasHeight*(8/10));

            ctx.lineTo(canvasWidth*(8/10), canvasHeight*(8/10));
            ctx.lineTo(canvasWidth*(2/10), canvasHeight*(8/10));


            ctx.moveTo(canvasWidth*(80/100), canvasHeight*(50/100));
            ctx.lineTo(canvasWidth*(100/100), canvasHeight*(50/100));

            break

        case"zener":
            ctx.moveTo(0, canvasHeight/2);
            ctx.lineTo(canvasWidth*(2/10), canvasHeight/2);

            ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(8/10), canvasHeight*(8/10));

            ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(2/10), canvasHeight*(8/10));

            ctx.moveTo(canvasWidth*(8/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(2/10), canvasHeight*(8/10));

            ctx.moveTo(canvasWidth*(8/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(8/10), canvasHeight*(8/10));

            ctx.moveTo(canvasWidth*(80/100), canvasHeight*(50/100));
            ctx.lineTo(canvasWidth*(100/100), canvasHeight*(50/100));
            break

        case"GND":
            ctx.moveTo(canvasWidth/2, 0);
            ctx.lineTo(canvasWidth/2, canvasHeight*(2/10));
            
            ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth*(8/10), canvasHeight*(2/10));

            ctx.moveTo(canvasWidth*(8/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth/2, canvasHeight*(8/10));

            ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
            ctx.lineTo(canvasWidth/2, canvasHeight*(8/10));

            break

        case"capacitor":
        ctx.moveTo(0, canvasHeight/2);
        ctx.lineTo(canvasWidth*(2/10), canvasHeight/2);

        ctx.moveTo(canvasWidth*(2/10), canvasHeight*(2/10));
        ctx.lineTo(canvasWidth*(2/10), canvasHeight*(8/10));


        ctx.moveTo(canvasWidth*(8/10), canvasHeight*(2/10));
        ctx.lineTo(canvasWidth*(8/10), canvasHeight*(8/10));

        ctx.moveTo(canvasWidth*(80/100), canvasHeight*(50/100));
        ctx.lineTo(canvasWidth*(100/100), canvasHeight*(50/100));

        break
        case"board-1":
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(canvasWidth*(2/10), canvasHeight*(2/10), canvasWidth*(6/10), canvasHeight*(6/10));
        case"board-2":
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(canvasWidth*(2/10), canvasHeight*(2/10), canvasWidth*(4/10), canvasWidth*(4/10));
        case"board-3":
            ctx.fillStyle = "#FFF000";
            ctx.fillRect(canvasWidth*(2/10), canvasHeight*(2/10), canvasWidth*(6/10), canvasWidth*(6/10));
    }

    ctx.stroke()
}

function itemCanvas(itemClicked){
    var canvas = document.getElementById("the-canvas");
    var ctx = canvas.getContext("2d");
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasWidth=canvas.width;
    canvasHeight=canvas.height;
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 2;
    drawComponent(ctx,itemClicked)
}



