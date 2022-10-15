song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
songStatus = "";
function preload(){
    song1 = loadSound("Sunflower.mp3");
    song2 = loadSound("Believer.mp3");
}
function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
function draw(){
    image(video , 0 , 0 , 600 , 500);
    fill("#9ACD32");
    stroke("#000000");
    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        song1.play();
        song1.isPlaying();
    }else if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        song2.play();
        song2.isPlaying();
    }else if(leftWristScore < 0.2 && rightWristScore < 0.2){
        song1.stop();
        song2.stop();
    }
}