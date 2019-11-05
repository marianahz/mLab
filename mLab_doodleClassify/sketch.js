let doodleNet;
let canvas;
let label;
let confianza;
let titulo;
let fuente;

function preload() {
  doodleNet = ml5.imageClassifier('DoodleNet');
  titulo =loadFont('Bungee.ttf');
  fuente=loadFont('OpenSans.ttf');
}

function setup() {
  if(windowWidth>windowHeight){
    canvas = createCanvas(windowHeight, windowHeight);
  }else{
    canvas = createCanvas(windowWidth, windowWidth);
  }
  textFont(titulo);
  background(245,226,200);
  canvas.mouseReleased(clasificar);
  strokeWeight(0);
  textSize(width/20);
  fill(255);
  rect(0,width*7/8,width/2.5,width/8);
  fill(0);
  text('DOODLENET', width/50,width*57/60);
  textSize(width/25);
  textFont(fuente);
  //label = createDiv('Objeto: ???');
  //confianza = createDiv('Confianza: ???');
}


function draw() {
  stroke(0);
  if (mouseIsPressed) {
    if(mouseX>width/3 || mouseY<width*7/8){
      strokeWeight(width/20);
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}

function clasificar() {
  if(mouseX<width/3 && mouseY>width*7/8){
    background(245,226,200);
    strokeWeight(0);
    fill(0);
    rect(0,width*7/8,width/2.5,width/8);
    fill(255);
    text('Object: ???', width/50,width*25/27);
    text('Confidence: ???', width/50,width*26.3/27);
  }else{
    noStroke();
    fill(200);
    rect(0,width*7/8,width/2.5,width/8);
    doodleNet.classify(canvas, resultado);
    //saveCanvas(canvas,'canvas','jpg')
  }
}

function resultado(error, resultado) {
  if (error) {
    console.error(error);
  }
  console.log(resultado);
  strokeWeight(0);
  fill(255);
  rect(0,width*7/8,width/2.5,width/8);
  fill(0);
  text(resultado[0].label.toUpperCase(), width/50,width*25/27);
  text('Confidence: ' + nf(round(resultado[0].confidence*100))+"%", width/50,width*26.3/27);
}
