
var slider;
var sizeOfCircle = 25;
var sliderVal = 1;
var r, g, b;
var sizeSlider;
var sizeText;
var rval = 1, gval = 1, bval = 1;
var rtext, gtext, btext;
var flower;
function setup() {
    // Create the canvas
    var canvas = createCanvas(600, 400);
    background(200);
    textSize(32);
    flower = createGraphics(500, 500);
    slider = createSlider(1, 15, 1, 1);
    sizeSlider = createSlider(10, 75, 1, 1);
    r = createSlider(1, 255, 1, 10);
    b = createSlider(1, 255, 1, 10);
    g = createSlider(1, 255, 1, 10);
    slider.position(10, 10);
    sizeSlider.position(10, 550);
    sizeText = createElement('p', 'Zoom: ' + sizeOfCircle)
    rtext = createElement('p','R: ' + rval);
    btext = createElement('p', 'B: ' + bval);
    gtext = createElement('p', 'G: ' + gval);
    r.position(650, 100);
    b.position(650, 150);
    g.position(650, 200);
    rtext.position(800, 85);
    sizeText.position(160, 535);
    gtext.position(800, 135);
    btext.position(800, 185);
    slider.style('width', '600px');

    slider.changed(sliderValue)
    var centerX = width / 2;
    var centerY = height / 2;
    drawPattern(centerX, centerY, sliderVal);

}
function draw() {
    rval = r.value();
    gval = g.value();
    bval = b.value();

    rtext.remove();
    gtext.remove();
    btext.remove();
    rtext = createElement('p', 'R: ' + r.value());
    btext = createElement('p', 'B: ' + g.value());
    gtext = createElement('p', 'G: ' + b.value());
    rtext.position(800, 85);
    gtext.position(800, 135);
    btext.position(800, 185);
    var centerX = width / 2;
    var centerY = height / 2;
    clear();
    background(200);
    drawPattern(centerX, centerY, sliderVal);

    sizeText.remove();
    sizeOfCircle = sizeSlider.value();
    sizeText = createElement('p', 'Zoom: ' + Math.floor(sizeOfCircle /75 * 100) + '%' )
    sizeText.position(160, 535);
}


function drawPattern(centerX, centerY, val) {
  
    for (z = 0; z < val; z++) {

        calulateLayer(z, centerX, centerY);

    }
}


function sliderValue() {
    var item = slider.value();
    sliderVal = item;
    var centerX = width / 2;
    var centerY = height / 2;
    clear();
    background(200);
    drawPattern(centerX, centerY, sliderVal);
}

function calulateLayer(layer, centerX, centerY){
    
    var size = (sizeOfCircle / 2) * layer;
    var offset = 3 * layer;

    calculateSet(1,centerX, centerY - (size));
    calculateSet(1, centerX, centerY + (size));


    for (var t = 1; t < layer + 1; t++) {
        calculateSet(1 ,centerX - (size - offset) , centerY - (size) / 2);
    }
    for (var b = 1; b < layer + 1; b++) {
        calculateSet(1,centerX - (size - offset), centerY + (size) / 2);
    }
    for (var t = 1; t < layer + 1; t++) {
        calculateSet(1 ,centerX + (size - offset), centerY - (size) / 2);
    }
    for (var b = 1; b < layer + 1; b++) {
        calculateSet(1, centerX + (size - offset), centerY + size / 2);
    }

    
}

function drawCircle(x, y) {
    noFill();
    stroke(rval, bval, gval);
    ellipse(x, y, sizeOfCircle, sizeOfCircle);
}

function calculateLeft(centerX, centerY, layer) {
    var size = sizeOfCircle / 2;

    drawCircle(centerX, centerY - (size));
    for (var t = 1; t < layer + 1; t++) {
        drawCircle(centerX - (size - 3), centerY - (size) / 2);   
    }
    for (var b = 1; b < layer + 1; b++) {
        drawCircle(centerX - (size - 3), centerY + (size) / 2);
    }
}

function calculateRight(centerX, centerY, layer) {
    var size = sizeOfCircle / 2 * layer;

        drawCircle(centerX, centerY + (size))

    for (var t = 1; t < layer + 1; t++) {
        drawCircle(centerX + (size - 3), centerY - (size) / 2);
    }

    for (var b = 1; b < layer + 1; b++) {
        drawCircle(centerX + (size - 3), centerY + size / 2);
    }
}


function calculateSet(layer, centerX, centerY) {
    calculateLeft(centerX, centerY, layer);
    calculateRight(centerX, centerY, layer);
}