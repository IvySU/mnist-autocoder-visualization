var PencilDown = false;
var LineColor = "white";
var LineWidth = 16;
var PencilPosition;
var CanvasOrig;
var CanvasGene;
var CtxOrig;
var CtxGene;

function initCanvas() {
    CanvasOrig = document.getElementById('canvas-orig');
    CanvasGene = document.getElementById('canvas-gene');
    CtxOrig = CanvasOrig.getContext("2d");
    CtxGene = CanvasGene.getContext("2d");
    CtxOrig.fillRect(0, 0, 280, 280);
    CtxGene.fillRect(0, 0, 280, 280);

    CanvasOrig.addEventListener("mousemove", onPencilMoving, true);
    CanvasOrig.addEventListener("mousedown", onPencilDown, false);
    CanvasOrig.addEventListener("mouseup", onPencilUp, false);
    CanvasOrig.addEventListener("dblclick", clearCanvas, false);
}

function getPencilPosition(event) {
    var x = event.clientX - CanvasOrig.offsetLeft;
    var y = event.clientY - CanvasOrig.offsetTop;
    return {x: x, y: y};
}

function onPencilDown(event){
    PencilDown = true;
    PencilPosition = getPencilPosition(event);
}

function onPencilMoving(event){
    if (PencilDown) {
        CtxOrig.beginPath();
        CtxOrig.moveTo(PencilPosition.x, PencilPosition.y);
        PencilPosition = getPencilPosition(event);
        CtxOrig.lineTo(PencilPosition.x, PencilPosition.y);
        CtxOrig.strokeStyle = LineColor;
        CtxOrig.lineWidth = LineWidth;
        CtxOrig.lineCap = "round";
        CtxOrig.stroke();
    }
}

function onPencilUp() {
    PencilDown = false;

    var raw = CtxOrig.getImageData(0, 0, 280, 280);
    var feature = encodeImg(raw);
    updateSlider(feature);
}

function clearCanvas() {
    PencilDown = false;
    CtxOrig.fillRect(0, 0, 280, 280);
}


function img2vec(raw){
    var v = new Array(raw.data.length / 4);
    for (var i = 0; i < v.length; i++){
        v[i] = raw.data[i*4] / 256;
    }
    return v;
}

function vec2img(V) {
    var img = CtxOrig.getImageData(550, 0, 280, 280);
    for (var i = 0; i < img.data.length; i++){
        img.data[i*4] =V[i] * 256;
        img.data[i*4+1] =V[i] * 256;
        img.data[i*4+2] =V[i] * 256;
        img.data[i*4+3] =256 - V[i] * 256;
    }
    return img;
}


function createSliders(n) {
    var list = document.getElementById("slider-list");
    for (var i = 0; i < n; i++) {
        var node = document.createElement("li");
        node.setAttribute("class", "slider-list-item");

        var slider = document.createElement("input");
        slider.setAttribute("id", "slider" + i);
        slider.setAttribute("class", "slider");
        slider.setAttribute("featureID", i);
        slider.type = "range";
        slider.min = "0";
        slider.max = "1";
        slider.step = "0.0001";
        slider.value = "0";
        slider.setAttribute("onchange", "slidersOnchange()");
        node.appendChild(slider);

        var id = document.createElement("span");
        id.setAttribute("class", "slider-id");
        id.innerHTML = "No. " + i + " :";
        node.appendChild(id);

        var text = document.createElement("span");
        text.setAttribute("class", "slider-text");
        text.innerHTML = "0";
        node.appendChild(text);

        list.appendChild(node)
    }
}

function slidersOnchange() {
    updateSliderText();
    var feature = [];
    var sliders = document.getElementsByClassName("slider");
    for (var i = 0; i  < sliders.length; i++) {
        feature[i] = sliders[i].value;
    }
    var img = decodeFeature(feature);
    CtxGene.putImageData(img, 0, 0);
}

function updateSlider(v) {
    var sliders = document.getElementsByClassName("slider");
    for (var i = 0; i  < sliders.length; i++) {
        sliders[i].value = v[i];
    }
    slidersOnchange();
    updateSliderText();
}

function updateSliderText() {
    var sliders = document.getElementsByClassName("slider");
    var texts = document.getElementsByClassName("slider-text");
    for (var i = 0; i  < sliders.length; i++) {
        texts[i].innerHTML = sliders[i].value;
    }
}