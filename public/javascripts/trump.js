var box = document.getElementById("myCanvas2");
var shapeList = list;
var ctx = box.getContext("2d");
ctx.globalAlpha = 0.75;
box.style.position = "relative";
box.style.top = "50px";
//console.log("Stuffs" + shapeList[0].size + shapeList[0].color + shapeList[0].shape);

//Fill Canvas with Hash Value of String Data
//TODO: Fill canvas with 
ctx.beginPath();
ctx.rect(0, 0, 650, 450);
console.log("\'" + intToRGB(hashCode(shapeList[0].shape)) + "\'");
//ctx.fillStyle = "#" + intToRGB(hashCode(shapeList[0].shape));
ctx.fillStyle = '#000000';
ctx.fill();

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function run() {
    console.log("SHAPE SIZE: " + shapeList.length);
    for (var i = 0; i < shapeList.length; i++) {
        if (shapeList[i].shape == 'Cross') {
            var index = i;
            drawNegative((Math.random() * 600), (Math.random() * 400), index);
        }

        if (shapeList[i].shape == 'Circle') {
            var index = i;
            drawPositive((Math.random() * 600), (Math.random() * 400), index);
        }

        if (shapeList[i].shape === 'Triangle') {
            var index = i;
            drawNeutral((Math.random() * 600), (Math.random() * 400), index);
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
}

//Radius of the circle is half the height of the Cross
//Height of the Cross is (40 * size) + (20 * size) = 60 * size
function drawPositive(x, y, index) {
    ctx.beginPath();
    ctx.arc(x, y, (shapeList[index].size * 60) / 2, 0, 2 * Math.PI);
    ctx.fillStyle = shapeList[index].color;
    ctx.strokeStyle = shapeList[index].color;
    ctx.stroke();
    ctx.fill();
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

}

console.log("\'" + intToRGB(hashCode(shapeList[0].shape)) + "\'");
ctx.fillStyle = "#" + intToRGB(hashCode(shapeList[0].shape));
ctx.fillStyle = '#000000';
ctx.fill();

run();