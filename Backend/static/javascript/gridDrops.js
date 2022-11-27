

function clashingCheck(gridElement,row,column){
    var clash=false;
    var myElementIndex=Array.prototype.indexOf.call(allElements, gridElement);
    for(var i=myElementIndex; i<(myElementIndex+columns*row) ; i+=columns ){
      console.log(i)
      for(var j=0;j<column;j++){
        if(allElements[i+j].classList.contains("filled")){
          clash=true
          break
        }
      }
    }
    return clash
}
  

function dropInGridTile(e){
    var data = e.dataTransfer.getData("text");
    showFound(e.target,data)
}


function dragOverInGridTile(e){
    e.preventDefault();
    (e.target).style.backgroundColor = "#AA0000"
}


function onLeaveInGridTile(e){
    e.preventDefault();
    (e.target).style.backgroundColor = "transparent"
}  



function gibRowandColumn(data){
    var rows=0,columns=0, colour="",type=""
    switch(data){
        case"resistor":
            rows=1
            columns=2
            type="component"
            break

        case"diode":
            rows=1
            columns=2
            type="component"
            break
        
        case"zener":
            rows=1
            columns=2
            type="component"
            break

        case"GND":
            rows=1
            columns=1
            type="component"
            break

        case"capacitor":
            rows=1
            columns=2
            type="component"
            break

        case"board-1":
            rows=10
            columns=5
            colour="#FF0000";
            break

        case"board-2":
            rows=5
            columns=5
            colour="#FF0000";
            break

        case"board-3":
            rows=10
            columns=10
            colour="#FFF000";
            break
        
    }

    return [rows,columns,colour,type]
}

  function showFound(myElement,data) {
    //important
      myElement.style.backgroundColor = "transparent"
      let maxcolpos = -1, colposCount = 0;
      var elem
      for(elem of allElements) {
        let l = elem.getBoundingClientRect().left;
        if (l > maxcolpos) {
          maxcolpos = l;
          if (myElement.getBoundingClientRect().left > l) colposCount ++;
        }
      }
      
  
      let maxrowpos = -1, rowposCount = 0;
      for(elem of allElements) {
        let l = elem.getBoundingClientRect().top;
        if (l > maxrowpos) {
          maxrowpos = l;
          if (myElement.getBoundingClientRect().top > l) {
            rowposCount ++
          };
        }
      }
      
      requiredRows=gibRowandColumn(data)[0]
      requiredColumns=gibRowandColumn(data)[1]
      const columnIndex = colposCount + 1;
      const columnIndex1 =columnIndex+requiredColumns
      const rowIndex = rowposCount + 1;
      const rowIndex1=rowIndex+requiredRows
  
      console.log(rowIndex)
  
      if(rowIndex1>rows+1){
        alert("Boundry breaking")
        return
      }
      if(columnIndex1>columns+1){
        alert("Boundry breaking")
        return
      }
  
      if(clashingCheck(myElement,requiredRows,requiredColumns)){
        alert("Clashing!!!")
        return
      }
      
      //importantOVER
      var createPlacementTile
      if(gibRowandColumn(data)[3]=="component"){
        createPlacementTile = () => {
            canvas=document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width  = tileSizeX*requiredColumns;
            canvas.height = tileSizeY*requiredRows;

            console.log(`${tileSizeX*requiredColumns}px`, `${tileSizeY*requiredRows}px`)
            console.log(canvas.offsetWidth,canvas.offsetHeight)
            ctx.strokeStyle = "#FF0000";
            canvas.classList.add("grid-placement-item");
            drawComponent(ctx,data, canvas.width, canvas.height)
            canvas.style.backgroundColor="white"
            return canvas;
          };
      }
      else{
        createPlacementTile = () => {
            const tile = document.createElement("div");
            chosenArray = ["Horse", "Pig", "Dog", "Cat", "Parrot", "Iguana"]
            tile.innerHTML = chosenArray[Math.floor(Math.random() * chosenArray.length)];;
            tile.classList.add("grid-placement-item");
            return tile;
          };
      }
      
  
      var a;
      a=placement.appendChild(createPlacementTile());
      a.classList.add("pcb-1");
      a.style.backgroundColor=gibRowandColumn(data)[2]
  
      var myElementIndex=Array.prototype.indexOf.call(allElements, myElement);
      for(var i=myElementIndex; i<(myElementIndex+columns*requiredRows) ; i+=columns ){
        console.log(i)
        for(var j=0;j<requiredColumns;j++){
          allElements[i+j].classList.add("filled")
        }
      }
  
  
      
      a.style.setProperty("--row", rowIndex);
      a.style.setProperty("--row1", rowIndex1);
      a.style.setProperty("--column", columnIndex);
      a.style.setProperty("--column1", columnIndex1);
  }
  




//   var anotherClicked
//   function componentClicked(target){
//     try{
//       anotherClicked.classList.remove("clicked")
//     }catch{
  
//     }
//     finally{
//       target.classList.add("clicked");
//       anotherClicked=target
//       console.log("set")
//     }
//   }