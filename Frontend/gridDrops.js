function clashingCheck(gridElement){
    var clash=false;
    var myElementIndex=Array.prototype.indexOf.call(allElements, gridElement);
    for(var i=myElementIndex; i<(myElementIndex+columns*10) ; i+=columns ){
      console.log(i)
      for(var j=0;j<10;j++){
        if(allElements[i+j].classList.contains("filled")){
          clash=true
          break
        }
      }
    }
    return clash
}
  

function dropInGridTile(e){
    showFound(e.target)
}


function dragOverInGridTile(e){
    e.preventDefault();
    (e.target).style.backgroundColor = "#AA0000"
}


function onLeaveInGridTile(e){
    e.preventDefault();
    (e.target).style.backgroundColor = "transparent"
}  
  
  const allElements = wrapper.querySelectorAll('.grid-item');
  function showFound(myElement) {
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
      const columnIndex = colposCount + 1;
      const columnIndex1 =columnIndex+10
  
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
  
      const rowIndex = rowposCount + 1;
      const rowIndex1=rowIndex+10
  
      console.log(rowIndex)
  
      if(rowIndex1>rows+1){
        alert("Boundry breaking")
        return
      }
      if(columnIndex1>columns+1){
        alert("Boundry breaking")
        return
      }
  
      if(clashingCheck(myElement)){
        alert("Clashing!!!")
        return
      }
  
      const createPlacementTile = () => {
        const tile = document.createElement("div");
        chosenArray = ["Horse", "Pig", "Dog", "Cat", "Parrot", "Iguana"]
        tile.innerHTML = chosenArray[Math.floor(Math.random() * chosenArray.length)];;
        tile.classList.add("grid-placement-item");
        tile.draggable = true
        tile.setAttribute("ondragstart", `startDrag(event)`);
        tile.setAttribute("ondragover", "_onDragOver(event)");
        tile.setAttribute("ondragend", "_onDragEnd(event)");
        return tile;
      };
  
      var a;
      a=placement.appendChild(createPlacementTile());
      a.classList.add("pcb-1");
  
      var myElementIndex=Array.prototype.indexOf.call(allElements, myElement);
      for(var i=myElementIndex; i<(myElementIndex+columns*10) ; i+=columns ){
        console.log(i)
        for(var j=0;j<10;j++){
          allElements[i+j].classList.add("filled")
        }
      }
  
  
      
      a.style.setProperty("--row", rowIndex);
      a.style.setProperty("--row1", rowIndex+10);
      a.style.setProperty("--column", columnIndex);
      a.style.setProperty("--column1", columnIndex+10);
  }
  
  var anotherClicked
  function componentClicked(target){
    try{
      anotherClicked.classList.remove("clicked")
    }catch{
  
    }
    finally{
      target.classList.add("clicked");
      anotherClicked=target
      console.log("set")
    }
  }