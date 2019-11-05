//mLab-pose
let video;
let poseNet;
let poses = [];


function preload(){
  video = createCapture(VIDEO);
}

function setup() {
  if(windowWidth>windowHeight){
    createCanvas(windowHeight*4/3, windowHeight);
  }else{
    createCanvas(windowWidth, windowWidth*4/3);
  }
  poseNet = ml5.poseNet(video, cargado);
  video.size(width, height);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function draw() {
  //image(video, 0, 0, width, height);
  background(255);
  dibujarArticlaciones();
  dibujarHuesos();
}

function cargado() {
  console.log("ISIS1001 - Modelo listo");
}

function dibujarArticlaciones()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let articulacion = pose.keypoints[j];
      if (articulacion.score > 0.2) {
        fill(0, 0, 255);
        noStroke();
        ellipse(articulacion.position.x, articulacion.position.y, 15, 15);
      }
    }
  }
}

function dibujarHuesos() {
  for (let i = 0; i < poses.length; i++) {
    let huesos = poses[i].skeleton;
    for (let j = 0; j < huesos.length; j++) {
      let partA = huesos[j][0];
      let partB = huesos[j][1];
      strokeWeight(4);
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
