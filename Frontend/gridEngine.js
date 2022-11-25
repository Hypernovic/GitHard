const outsideGrid = document.getElementById("outside-grid");
const parentWrapper = document.getElementById("grid-container-placement-class");
const wrapper = document.getElementById("grid-container");
const placement = document.getElementById("grid-placement-container");
let columns = 0,rows = 0;

var mode=["",""]

const createTile = (index) => {
  const tile = document.createElement("div");
  tile.innerHTML = ".";
  tile.classList.add("grid-item");
  tile.setAttribute("ondrop", `drop(event)`);
  tile.setAttribute("ondragover", "DragOver(event)");
  tile.setAttribute("ondragleave", "leave(event)");
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


window.onresize = () => createGrid();