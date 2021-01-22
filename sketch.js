const World=Matter.World,
      Engine=Matter.Engine,
      Bodies=Matter.Bodies,
      Body=Matter.Body,
      Thread=Matter.Constraint;
var myWorld,myEngine;
var ground;
var ball;
var thread;
var build=[];

function setup()
{
    createCanvas(800,1000);

    myEngine=Engine.create();
    myWorld=myEngine.world;

    ground=Bodies.rectangle(width/2,990,width,20,{isStatic:true});
    World.add(myWorld,ground);

    ball=Bodies.circle(100,650,100,{density:1.2,friction:1,restitution:0});
    World.add(myWorld,ball);

    thread= Thread.create({pointA:{x:100,y:350},bodyB:ball,stiffness:1,length:300});
    World.add(myWorld,thread);
     
    for(var i=730;i>=130;i-=100)
    {
        var b=Bodies.rectangle(300,i,50,100,{friction:1});
        World.add(myWorld,b);
        build.push(b);
        b=Bodies.rectangle(350,i,50,100,{friction:1});
        World.add(myWorld,b);
        build.push(b);
        b=Bodies.rectangle(400,i,50,100,{friction:1});
        World.add(myWorld,b);
        build.push(b);
        b=Bodies.rectangle(450,i,50,100,{friction:1});
        World.add(myWorld,b);
        build.push(b);
    }
   console.log(myWorld);

    
}

function draw()
{
    background("blue");

    Engine.update(myEngine);
    push();
    fill("brown");
    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,width,20);
    pop();
    
    push();
    fill(180);
    ellipseMode(RADIUS);
    ellipse(ball.position.x,ball.position.y,100);
    pop();

    line(thread.pointA.x,thread.pointA.y,ball.position.x,ball.position.y);
    
    for(var i=0;i<build.length;i++)
    {
        push();
        rectMode(CENTER);
        translate(build[i].position.x,build[i].position.y);
        rotate(build[i].angle);
        rect(0,0,50,100);
        pop();

    }
    push();
    strokeWeight(10);
    stroke("red")
    text("Press Space Bar To Move The WRECKING BALL.",200,200);
    pop();


}

function keyPressed()
{
    if(keyCode==32){
    Body.applyForce(ball,ball.position,{x:1000,y:800});
    }
}