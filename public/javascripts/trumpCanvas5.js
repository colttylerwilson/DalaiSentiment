var box = document.getElementById("myCanvas5");
box.style.position = "relative";
box.style.top = "50px";
var shapeList = list;
var ctx = box.getContext("2d");
ctx.globalAlpha = 0.75;
ctx.beginPath();
ctx.rect(0, 0, 850, 600);
ctx.fillStyle = '#000000';
ctx.fill();

//------------------------- CANVAS LINE---------------------------
var fillTextSpace = 20;
ctx.globalAlpha = 1.00;
ctx.strokeStyle = "#c4d3e0";
ctx.moveTo(650, 10);
ctx.lineTo(650, 590);
ctx.stroke()
ctx.globalAlpha = 0.75;

//------------------------- END CANVAS LINE---------------------------



//ctx.fillStyle = '#000000';
ctx.fill();
run();


function run() {
    console.log("SHAPE SIZE: " + shapeList.length);
    for (var i = 0; i < shapeList.length; i++) {
        if (shapeList[i].canvas == 5) {
            if (shapeList[i].shape == 'Cross') {
                var index = i;
                drawNegative((Math.random() * 600), (Math.random() * 550), index);
            }

            if (shapeList[i].shape == 'Circle') {
                var index = i;
                drawPositive((Math.random() * 600), (Math.random() * 550), index);
            }

            if (shapeList[i].shape === 'Triangle') {
                var index = i;
                drawNeutral((Math.random() * 600), (Math.random() * 550), index);
            }
        }
    }
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function drawNegative(x, y, index) {
    ctx.beginPath();
    ctx.lineWidth = 10 * shapeList[index].size;
    ctx.moveTo(x, y - 40 * shapeList[index].size);
    ctx.lineTo(x, y + 20 * shapeList[index].size);

    ctx.moveTo(x - 20 * shapeList[index].size, y);
    ctx.lineTo(x + 20 * shapeList[index].size, y);
    ctx.strokeStyle = shapeList[index].color;
    ctx.stroke();
    ctx.fill();

    ctx.globalAlpha = 1.00;
    ctx.font = "15px Courier New";
    ctx.textAlign = "start";
    ctx.fillStyle = shapeList[index].color;
    ctx.fillText(shapeList[index].word + " -" + shapeList[index].size, 675, fillTextSpace);
    fillTextSpace = fillTextSpace + 20;
    ctx.globalAlpha = 0.75;
}

//Radius of the circle is half the height of the Cross
//Height of the Cross is (40 * size) + (20 * size) = 60 * size
function drawPositive(x, y, index) {
    ctx.beginPath();
    ctx.arc(x, y, (shapeList[index].size * 60) / 2, 0, 2 * Math.PI);
    ctx.fillStyle = shapeList[index].color;
    ctx.strokeStyle = shapeList[index].color;
    ctx.fill();

    ctx.globalAlpha = 1.00;
    ctx.font = "15px Courier New";
    ctx.textAlign = "start";
    ctx.fillStyle = shapeList[index].color;
    ctx.fillText(shapeList[index].word + " +" + shapeList[index].size, 675, fillTextSpace);
    fillTextSpace = fillTextSpace + 20;
    ctx.globalAlpha = 0.75;
}

function drawNeutral(x, y, index) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 40);
    ctx.lineTo(x - 40, y + 40);
    ctx.fillStyle = shapeList[index].color;
    ctx.fill();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 40);
    ctx.lineTo(x + 40, y + 40);
    ctx.fill();

    ctx.globalAlpha = 1.00;
    ctx.font = "15px Courier New";
    ctx.textAlign = "start";
    ctx.fillStyle = shapeList[index].color;
    ctx.fillText(shapeList[index].word, 675, fillTextSpace);
    fillTextSpace = fillTextSpace + 20;
    ctx.globalAlpha = 0.75;
}