var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.style.position = "relative";
//c.style.top = "600px";

var y = 200;
var x = 0;
var currentRed =  Math.floor(Math.random()* 250);
var currentGreen =  Math.floor(Math.random()* 250);
var currentBlue =  Math.floor(Math.random()* 250);
var currentColor = rgb(currentRed, currentGreen, currentBlue);
var radius = 40;

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 
 
window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back


function movediv(timestamp){
    x = x + 5;
    checkBounds();
    y = y + drunkWalk();
    drunkColor();
    ctx.beginPath();  
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = rgb(currentRed, currentGreen, currentBlue);
    ctx.fill();

    x = x + 5;
    checkBounds();
    y = y + drunkWalk();
    drunkColor();
    ctx.beginPath();  
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = rgb(currentRed, currentGreen, currentBlue);
    ctx.fill();

    x = x + 5;
    checkBounds();
    y = y + drunkWalk();
    drunkColor();
    ctx.beginPath();  
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = rgb(currentRed, currentGreen, currentBlue);
    ctx.fill();
    requestAnimationFrame(movediv) // call requestAnimationFrame again to animate next frame
}
requestAnimationFrame(movediv) // call requestAnimationFrame and pass into it animation function

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}

function checkBounds()
{
  if (x > 700)
  {
    x = 0;
    y = y + 1;
  }
  if(y > 500)
  {
    y = y -1;
  }
  if(y < 0)
  {
    y = y + 1;
  }
  if(currentRed > 240)
  {
    currentRed--;
  }
  if(currentGreen > 240)
  {
    currentGreen--;
  }
  if(currentBlue > 240)
  {
    currentBlue--;
  }
  if(currentRed < 20)
  {
    currentRed++;
  }
  if(currentGreen < 20)
  {
    currentGreen++;
  }
  if(currentBlue < 20)
  {
    currentBlue++;
  }
}

function drunkWalk()
{
  var nextStep = 0;
  if(Math.floor(Math.random()* 2) == 0)
  {
    nextStep = nextStep - 2;
  }
  else{
    nextStep = nextStep + 2;
  }
  return nextStep;
}

function drunkColor()
{
  var drunkRed = 0;
  var drunkGreen = 0;
  var drunkBlue = 0;
  if(Math.floor(Math.random()* 2) == 0)
  {
    drunkRed = drunkRed - 2;
  }
  else
  {
    drunkRed = drunkRed + 2;
  }
  if(Math.floor(Math.random()* 2) == 0)
  {
    drunkGreen = drunkGreen - 2;
  }
  else
  {
    drunkGreen = drunkGreen + 2;
  }
  if(Math.floor(Math.random()* 2) == 0)
  {
    drunkBlue = drunkBlue - 2;
  }
  else
  {
    drunkBlue = drunkBlue + 2;
  }
  currentRed = currentRed + drunkRed;
  currentGreen = currentGreen + drunkGreen;
  currentBlue = currentBlue + drunkBlue;
}