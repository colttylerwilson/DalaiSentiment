var box = document.getElementById("myCanvas2");
var boxCtx = box.getContext("2d");
box.style.position = "relative";
box.style.top = "50px";

var width = 650;
var height = 450;

var pixels = new Array(width);


for(i = 0 ; i < width; i++)
{
    pixels[i] = new Array(height);
    for(x = 0 ; x < height; x++)
    {
        var pixel = {
            xpos : i,
            ypos : x,
            red : Math.floor(Math.random()* 250),
            blue : Math.floor(Math.random()* 250),
            green : Math.floor(Math.random()* 250),
            alive : Math.floor(Math.random() * 2)
        }
        pixels[i][x] = pixel;
    }
}

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


function printToScreen()
{
    for(i = 0 ; i < width; i++)
    {
        for(ii = 0; ii < height; ii++)
        {
          if(pixels[i][ii].alive == 1)
          {
            drunkColor();
            boxCtx.fillStyle = rgb(currentRed, currentGreen, currentBlue);
            boxCtx.fillRect(pixels[i][ii].xpos, pixels[i][ii].ypos, 1, 1 );
          }
        }
    }
}

printToScreen();


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
//requestAnimationFrame(movediv) // call requestAnimationFrame and pass into it animation function



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