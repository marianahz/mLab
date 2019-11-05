//mLab-videoClassify
var mobileNet;
var video;
var nombre="CARGANDO";
var confianza="mLab";
var time;
function preload(){
  mobileNet= ml5.imageClassifier('MobileNet', modelReady);
  video = createCapture(VIDEO);
}

function setup() {
  if(windowWidth>windowHeight){
    createCanvas(windowHeight*4/3, windowHeight);
  }else{
    createCanvas(windowWidth, windowWidth*4/3);
  }
  background(200);
  video.size(width, height);
  video.hide();
  time=(round(millis()/1000)+1)*1000;
  fill(0);
  textSize(32);
}

function draw() {
  if(millis()>time)
  {
    mobileNet.classify(video,resultado);
    time=(round(millis()/1000)+1)*1000;
  }
  image(video, 0, 0, width, height);
  text(nombre, 20,50);
  text(confianza+"%", 20,90);

}

function modelReady() {
  console.log('Modelo cargado - ISIS1001');
}

function resultado(error, resultado){
  if(error){
    console.error(error);
  }
  else{
    console.log(resultado);
    nombre=resultado[0].label.split(",")[0].toUpperCase();
    confianza=round(resultado[0].confidence*100);
  }
}
