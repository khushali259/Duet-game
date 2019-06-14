//setting up variables
var circle = {centerX:250, centerY:350, radius:60, angle:0}
var circle1 = {centerX1:250, centerY1:350, radius1:60, angle1:180}
var ball = {x:0, y:0,speed:.1};
var ball1 = {x1:0, y1:0, speed1:.1};
var continueAnimating = false;
var score = 0;
var Y=350;
var dy=0.02;
// setting up canvas
canvas = document.getElementById("myCanvas");
canvas.height=500;
canvas.width=500;
context = canvas.getContext("2d");



// rock variables
var rockWidth = 50;
var rockHeight = 20;
var totalRocks = 2;
var rocks=[];
for(var i=0;i<totalRocks;i++){
    addRock();
}

function addRock(){
    var rock={
        width:rockWidth,
        height:rockHeight,
        speed:0.5
    }
    resetRock(rock);
    rocks.push(rock);
}

// move the rock to a random position near the top-of-canvas
// assign the rock a random speed
function resetRock(rock){
    rock.x=100+Math.random()*(canvas.width/2);
    rock.y=15+Math.random()*50;
    rock.speed=rock.speed+0.1;
    rock.width=30+Math.random()*50;
    rock.height=20+Math.random()*25;

}
function animate() {

    if (continueAnimating) {
        requestAnimationFrame(animate);
    }
    for (var i = 0; i < rocks.length; i++) {

        var rock = rocks[i];

        // test for rock-block collision
        if (isColliding(rock, ball)) {
            alert("GAME OVER!!");
            document.location.reload();
            clearInterval(interval); 
        }
        if (isColliding1(rock, ball1)) {
            alert("GAME OVER!!");
            document.location.reload();
            clearInterval(interval); 
        }


        // advance the rocks
        rock.y += rock.speed;

        // if the rock is below the canvas,
        if (rock.y > canvas.height) {
            resetRock(rock);
        }

    }


}

function isColliding(a, b) {
    return !(
    b.x-10 > a.x + a.width || b.x +10 < a.x || b.y-10 > a.y + a.height || b.y + 10 < a.y);}
    function isColliding1(a, b) {
    return !(
    b.x1-10 > a.x + a.width || b.x1 +10 < a.x || b.y1-10 > a.y + a.height || b.y1 + 10 < a.y);}
function drawBall() {
    
      
      ball.x = circle.centerX + Math.cos(circle.angle*Math.PI/180) * circle.radius;
      ball.y = circle.centerY + Math.sin(circle.angle*Math.PI/180) * circle.radius;
      context.fillStyle = "#F52E40";
      context.beginPath();
      context.arc(ball.x,ball.y,12,0,Math.PI*2,true);
      context.closePath();
      context.fill();
      ball1.x1 = circle1.centerX1 + Math.cos(circle1.angle1*Math.PI/180) * circle1.radius1;
      ball1.y1 = circle1.centerY1 + Math.sin(circle1.angle1*Math.PI/180) * circle1.radius1;
      context.fillStyle = "#2E46F5";
      context.beginPath();
      context.arc(ball1.x1,ball1.y1,12,0,Math.PI*2,false);
      context.closePath();
      context.fill();
      
      circle.centerY=circle.centerY-dy;
      
      circle1.centerY1=circle1.centerY1-dy;

}


function draw() {


    context.clearRect(0, 0, canvas.width, canvas.height);

    score++;
    context.beginPath();
    
    context.arc(250,Y,60,0,2*Math.PI);
    Y=Y-dy;
    context.strokeStyle="white";
    context.stroke()
    context.closePath();

    drawBall();
    
     // draw all rocks
    for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
      
        // optionally, drawImage(rocksImg,rock.x,rock.y)
        context.fillStyle = "gray";
        context.fillRect(rock.x, rock.y, rock.width, rock.height);
        
    }

    // draw the score
    context.font = "14px Times New Roman";
    context.fillStyle = "white";
    context.fillText("Score: " + score, 10, 15);
}
document.onkeydown = function(e) {
    var event = window.event ? window.event : e;

    if (e.keyCode == '37') {
       circle1.angle1 += 5;
       circle.angle+=5;
    }
    else if (e.keyCode == '39') {
       circle1.angle1 -= 5;
       circle.angle -= 5;
    }
}
var interval=setInterval(draw, 10);
 for (var i = 0; i < rocks.length; i++) {
        resetRock(rocks[i]);
    }
  if (!continueAnimating) {
        continueAnimating = true;
        animate();
    };