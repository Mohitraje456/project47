var backImage,backgr;
var player, player_running;
var ground,ground_img;
var invisible
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png")
  obstacleImage = loadImage("stone.png")
  gameOverImage = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

   score = 0

  invisible = createSprite(400,200,20,20) 
  invisible.addImage(gameOverImage)
  invisible.visible = false
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")) {
      player.velocityY = -11;
    }
    player.velocityY = player.velocityY + 0.6;
  
    player.collide(ground);

    if(player.isTouching(FoodGroup)){
      FoodGroup[0].destroy();
      score += 2
      player.scale += 0.003
    }
    if(player.isTouching(obstacleGroup)){
      gameState = END
    }
    //player.debug = true
    spawnFood();
    spawnObstacles();
  
  }else if(gameState === END){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.velocityX = 0
    obstacleGroup.velocityX = 0
    invisible.visible = true;
    backgr.velocityX = 0
    player.destroy();
  }
  drawSprites();

  fill("lime")
  textSize(20)
  text("Score : "+score,670,50)

  fill("yellow")
  textSize(40)
  text("Monkey Go Happy",230,50)

  fill("pink")
  textSize(20)
  text("Try your best to score a 100!!",250,90)
}

function spawnFood(){

  if (frameCount % 67 === 0){
    var banana = createSprite(800,250,40,10);
    banana.y = random(180,230);
    banana.addImage(bananaImage);
    banana.velocityX = -10;
    banana.scale = 0.04;

    banana.lifetime = 300;
    player.depth = banana.depth+1
    FoodGroup.add(banana);
  }

}

function spawnObstacles(){

  if (frameCount % 109 === 0){
    var obstacle = createSprite(800,250,40,10);
    obstacle.y = 320
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(10+3*score/10);
    obstacle.scale = 0.18;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth+1
    obstacleGroup.add(obstacle);
  }

}



