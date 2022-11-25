const outsideGrid = document.getElementById("outside-grid");
const parentWrapper = document.getElementById("grid-container-placement-class");
const wrapper = document.getElementById("grid-container");
const placement = document.getElementById("grid-placement-container");
var secondaryToolBar=document.getElementById("secondary-tool-bar")
let columns = 0,rows = 0;

var mode=""

const createTile = (index) => {
  const tile = document.createElement("div");
  tile.innerHTML = ".";
  tile.classList.add("grid-item");
  tile.setAttribute("ondrop", `dropInGridTile(event)`);
  tile.setAttribute("ondragover", "dragOverInGridTile(event)");
  tile.setAttribute("ondragleave", "onLeaveInGridTile(event)");
  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};


function getOriginPoint(){
  return [document.getElementById("main-tool-bar").getBoundingClientRect().right,
  document.getElementById("secondary-nav-bar").getBoundingClientRect().bottom];
}



const createGrid = () => {
  const size = 20;
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);


  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows); 
  wrapper.style.setProperty("--heightwidth", size + "px");

  placement.style.setProperty("--columns", columns);
  placement.style.setProperty("--rows", rows); 
  placement.style.setProperty("--heightwidth", size + "px");
  createTiles(columns * rows);

};
createGrid();

const allElements = wrapper.querySelectorAll('.grid-item');

function dropInGridTile(e){
    
}


function dragOverInGridTile(e){

}


function onLeaveInGridTile(e){

}





// FUNCTIONS FOR BUTTONS
function toggleVisibility(element){
    if(outsideGrid.style.visibility==="hidden"){
        outsideGrid.style.visibility="visible"
        secondaryToolBar.style.visibility="visible"
        return
      }
      outsideGrid.style.visibility="hidden"
      secondaryToolBar.style.visibility="hidden"
      element.style.visibility="visible"
}





//FUNCTIONS FOR TOOLBAR

function toggleVisibilitySecondaryToolBar(type){
    
    if(secondaryToolBar.style.visibility==="visible" &&
     secondaryToolBar.getElementsByClassName("title-component")[0].innerHTML==type){
        secondaryToolBar.style.visibility="hidden"
        return
    }
    else if(secondaryToolBar.style.visibility==="visible"){
        secondaryToolBar.getElementsByClassName("title-component")[0].innerHTML=type
        return
    }
    else if(secondaryToolBar.style.visibility==="hidden"){
        secondaryToolBar.style.visibility="visible"
        secondaryToolBar.getElementsByClassName("title-component")[0].innerHTML=type
        return
    }
    else{
        secondaryToolBar.style.visibility="hidden"
    }


}


function toggleMovingMode(){
    parentWrapper.style.cursor = 'grab';
    mode="moving"

}

function toggleWiringMode(){
    parentWrapper.style.cursor = 'crosshair';
    mode="wiring"
}

function toggleComponentsMode(){
    mode="components"
    toggleVisibilitySecondaryToolBar("Components")
}


function toggleIcMode(){
    mode="boards"
    toggleVisibilitySecondaryToolBar("Boards")
}







