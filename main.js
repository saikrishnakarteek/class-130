song="";
leftwristX=0;
leftWristY=0;

rightwristX=0;
rightwristY=0;

score_left=0;
score_right=0;

function setup(){
    canvas = createCanvas(350,500);
    canvas.center();
   
    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded(){
console.log('Posenet has been Initialized');
}


 
function preload(){
    song= loadSound("music.mp3");
}

function draw(){
    image(video,0,0,350,500);

    fill("blue");
    stroke("red");
    if(score_right>0.2){
    circle(rightwristX,rightwristY,20);
    
    if(rightwristY>0 && rightwristY<=100){

     document.getElementById("speed").innerHTML="speed=0.5x";
     song.rate(0.5);
    }
    else if (rightwristY>100 && rightwristY<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if (rightwristY>200 && rightwristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if (rightwristY>300 && rightwristY<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if (rightwristY>400 && rightwristY<=500){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}

    if(score_left>0.2){

    circle(leftwristX,leftWristY,20);
    lwy= Number(leftwristY);
    removedecimals = floor(lwy);
    volume=removedecimals/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
}
}
 
function play1(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotposes(results){
   
   if(results.length>0){
       console.log(results);
       leftwristX= results[0].pose.leftWrist.x;
       leftwristY= results[0].pose.leftWrist.y;

       rightwristX= results[0].pose.rightWrist.x;
       rightwristY= results[0].pose.rightWrist.y;

       console.log("leftWristX = " + leftwristX + " leftwristY = " + leftwristY);
       console.log("rightWristX = " + rightwristX + " rightristY = " + rightwristY);

       score_left = results[0].pose.keypoints[9].score;
       score_right = results[0].pose.keypoints[10].score;
   }
}   


 