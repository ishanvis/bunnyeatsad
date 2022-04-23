const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadAnimation('eat_0.png');
  eating = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_4.png')
  crying = loadAnimation('sad_2.png','sad_3.png')
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  bunny = createSprite(250,650);
  bunny.addAnimation("bunny",rabbit)
  bunny.addAnimation("eating",eating)
  bunny.addAnimation("crying",crying)
  bunny.scale = 0.2
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(5,{x:345,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  image(food,fruit.position.x,fruit.position.y,70,70);
  rope.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

  collide()

  drawSprites() 
   
}

function keyPressed()
{
   if (keyCode == LEFT_ARROW) {
    fruit_con.detach() 
   }

   if (keyCode == RIGHT_ARROW) {
    fruit_con2.detach() 
   }
}

function collide(){
  var d = dist(fruit.position.x,fruit.position.y,bunny.x,bunny.y)
  if(d<80){
    console.log("collided")
    bunny.changeAnimation("eating")
  }

  else if(d>80 && d<200){
    console.log("not collided")
    bunny.changeAnimation("crying")
  }

  console.log(d)

}
