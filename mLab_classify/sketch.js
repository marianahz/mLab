//mLab-classify
let mobileNet;
let img;

function preload(){
  mobileNet= ml5.imageClassifier('MobileNet', modelReady);
  img=loadImage('data/imagen.png');

}

function setup() {
  if(windowWidth>windowHeight){
    createCanvas(windowHeight*400/500, windowHeight);
  }else{
    createCanvas(windowWidth, windowWidth*500/400);
  }
  background(200);
  image(img,0,0,width,height);
  fill(255);
  rect(0,0,350,100);
  fill(0);
  textSize(28);
  text("CARGANDO", 10,40);
  text("ISIS-1001 EXPOANDES", 10,80);
  input = createFileInput(handleFile);
  input.position(0, height-50);
  //noLoop();
}

function draw() {

}

function handleFile(file) {
  //print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();

    mobileNet.classify(img,resultado);
  } else {
    img = null;
  }
  background(255);
}

function modelReady() {
  console.log('Modelo cargado - ISIS1001');
  mobileNet.classify(img,resultado);
}

function resultado(error, resultado){
  if(error){
    console.error(error);
  }
  else{
    console.log(resultado);
    let nombre=resultado[0].label.split(",")[0].toUpperCase();
    let confianza=round(resultado[0].confidence*100);
    image(img,0,0,width,height);
    fill(255);
    rect(0,0,350,100);
    fill(0);
    textSize(32);
    text(nombre, 10,40);
    text(confianza+"%", 10,80);

  }
}
