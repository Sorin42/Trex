
var trex ,trex_running,trexcollided;
var invisibleground,ground,groundImage;
var clouds;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var play = 1
var end = 0
var gamestate = play
var obstaclegroup,cloudgroup;
var score = 0
var Gameover, restart, gamoverImg, restartImg;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png");
  cloudsImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")

}

function setup(){
  createCanvas(800,400);
  obstaclegroup = new Group()

  cloudgroup = new Group()
  //create a trex sprite
 trex = createSprite(50,340,20,50);
 trex.setCollider("circle",0,0,40,)
 //trex.debug = true;
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collision",trexcollided)


 ground = createSprite(200,380,380,20)
 ground.addImage("ground",groundImage)


 invisibleground = createSprite(200,390,380,20);
 invisibleground.visible = false;

 Gameover = createSprite(400,200,20,20)
 Gameover.addImage("Gameovertext",gameoverImg)

 restart = createSprite(400,270,20,20)
 restart.addImage("restartImage",restartImg)
 //console.timeEnd()
 //console.error("error")
// console.info("info")
 //console.warn("warning")
}


function draw(){
  //console.time();
  background("white");
 // console.count("draw frame is called")
text("score:" + score,450,50)
  if(gamestate === play){
    score += Math.round(frameCount/480)
  ground.velocityX = -4;
  if(ground.x <0){
ground.x = ground.width/2
  }
  if(trex.y > 200 &&  trex.velocityY < 0 && keyDown ("space")){
    trex.velocityY = - 10;
  }
  trex.velocityY += 0.8;

  restart.visible = false;
  Gameover.visible = false;
  createClouds()
  createObstacle()
  //console.timeEnd();
  if(obstaclegroup.isTouching(trex)){
    gamestate = end
  }
}
else if(gamestate === end){
  obstaclegroup.setLifetimeEach(-1)
  cloudgroup.setLifetimeEach(-1)
  ground.velocityX = 0
  obstaclegroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)
  Gameover.visible = true;
  restart.visible = true;
  trex.changeAnimation("collision",trexcollided)
  trex.velocityY = 0
}
trex.collide(invisibleground); 
drawSprites();
}

function createClouds(){
  if( frameCount % 100 === 0){
  clouds = createSprite(850,20,30,30);
  clouds.velocityX = -6;
  clouds.y = Math.round(random(60,120));
  clouds.addImage("cloud",cloudsImage);
  clouds.depth = trex.depth;
  trex.depth += 1;  

  cloudgroup.add(clouds)
  } 
}

function createObstacle(){
if( frameCount % 100 === 0){
obstacle = createSprite (800,350,10,10);
obstacle.velocityX = -6;
var randomNumber = Math.round(random(1,6));
obstacle.scale = 0.8;
switch(randomNumber){
case 1: obstacle.addImage("obstacle",obstacle1)
break;
case 2: obstacle.addImage("obstacle",obstacle2)
break;
case 3: obstacle.addImage("obstacle",obstacle3)
break;
case 4: obstacle.addImage("obstacle",obstacle4)
break;
case 5: obstacle.addImage("obstacle",obstacle5)
break;
case 6: obstacle.addImage("obstacle",obstacle6)
break;
default: break;
}

obstaclegroup.add(obstacle)
}


}
