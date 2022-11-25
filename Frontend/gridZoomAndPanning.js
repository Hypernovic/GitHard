var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 };



function setTransform() {
    parentWrapper.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

function defaultTransform(){
    parentWrapper.style.transform=
    "translate(" + 0 + "px, " + 0 + "px) scale(" + 1 + ")";
}


parentWrapper.onmousedown = function (e) {
  e.preventDefault();
  // sortable(e.target)
  if (e.ctrlKey || mode=="moving"){
    parentWrapper.style.cursor = 'grabbing';
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
    return
    }
};


  
parentWrapper.onmouseup = function (e) {
    parentWrapper.style.cursor = 'grab';
    panning = false;
    panning1=false
  };
  
  
  
  parentWrapper.onmousemove = function (e) {
    e.preventDefault();
    if (e.ctrlKey || mode=="moving"){
      if (!panning) {
          return;
        }
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;
        setTransform();
    }
  };
  
  parentWrapper.onwheel = function (e) {
    e.preventDefault();
    if (e.ctrlKey || mode=="moving"){
    var xs = (e.clientX - pointX) / scale,
      ys = (e.clientY - pointY) / scale,
      delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
    delta > 0 ? (parentWrapper.style.cursor = 'zoom-in',scale *= 1.2) : (parentWrapper.style.cursor = 'zoom-out',scale /= 1.2);
    if(scale>5){
      scale=5
    }
    if (scale<1){
      scale=1
    }
    pointX = e.clientX- xs * scale;
    pointY = e.clientY- ys * scale;
    setTransform();
  }
  };




