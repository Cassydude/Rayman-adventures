var PLAY = 1;   
var END = 0;
var gameState = PLAY;  


var rayman
var ground
var raymanImg
var bg
var backgroundImg
var livingstone
var livingstoneImg
var lums
var lumsImg
var livingstoneGroup
var lumsGroup
var gameOver, gameOverImg
var restart, restartImg


var runningScore=0;
var lumsScore=0;


function preload(){
  raymanImg = loadImage("Rayman.PNG")
  backgroundImg = loadImage("green-castle.jpg")
  livingstoneImg = loadImage("Livingstone.PNG")
  lumsImg = loadImage("lums.PNG")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
}


function setup(){
   createCanvas(windowWidth, windowHeight);
  bg = createSprite(0, 0, width, height)
  bg.addImage(backgroundImg)
  bg.velocityX = -5
  bg.scale = 3
  rayman = createSprite(50, height-150,20,50)
  rayman.addImage(raymanImg);
  ground = createSprite(width/2,height+20,width,10)
  //ground.addImage(backgroundImg)
  ground.velocityX = -5
  //ground.scale = 3
  livingstoneGroup = new Group();
  lumsGroup = new Group();
  gameOver = createSprite(width/2,height/2 - 50)
  restart = createSprite(width/2,height/2 + 50)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5
  restart.addImage(restartImg)
  restart.scale = 0.5
  
   gameOver.visible = false;
  restart.visible = false;
  
}

function draw(){
  background("white")
  if (gameState===PLAY){
    bg.velocityX = -5
    runningScore = runningScore + Math.round(getFrameRate()/60);
  if(keyDown("SPACE")){
    rayman.velocityY = -10
  }
  rayman.velocityY = rayman.velocityY +  0.5 
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
     if(bg.x < 0){
    bg.x = bg.width/2;
  }
  rayman.collide(ground);
  spawnEnemies();
  spawnLums();
    for(var i = 0; i < lumsGroup.length; i++){
        if(lumsGroup.isTouching(rayman)){
          lumsGroup.get(i).destroy();
      lumsScore = lumsScore + 5
    }
    }
    if(livingstoneGroup.isTouching(rayman)){
      gameState = END
    }
  }  
  else if(gameState===END){
    ground.velocityX = 0;
    livingstoneGroup.setVelocityXEach(0);
    lumsGroup.setVelocityXEach(0);
    rayman.velocityY = 0
    livingstoneGroup.setLifetimeEach(-1);
    lumsGroup.setLifetimeEach(-1);
    bg.velocityX = 0;
    
     gameOver.visible = true;
  restart.visible = true;
    
     if(mousePressedOver(restart)) {
      reset(); 
     }
    
    
  }
 
  drawSprites()
   textSize(20);
  textFont("Comic Sans MS");
  fill("yellow");
  text("Score: "+ runningScore, width/5, height/2);
  text("lumsScore: "+ lumsScore, width/5, height/3);
}

function spawnEnemies(){
  if( frameCount % 60 === 0){
    livingstone = createSprite(600,height-20,10,40)
    livingstone.addImage(livingstoneImg)
    livingstone.velocityX = -6
    livingstone.lifetime = 300
    livingstone.scale = 0.5
    livingstoneGroup.add(livingstone)
  }
}

function spawnLums(){
  if (frameCount % 80 === 0){
    lums = createSprite(1200, 315, 50, 50)
    lums.y = Math.round(random(height-200,height-100));
    lums.addImage(lumsImg)
    lums.velocityX = -6
    lums.lifetime = 300
    lums.scale = 0.4 
    lumsGroup.add(lums)
  }
  
  
  
  
  
  
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  
  livingstoneGroup.destroyEach();
  lumsGroup.destroyEach();
  
  runningScore = 0;
  lumsScore = 0;
}


