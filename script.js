const gameboard=document.getElementById('gameboard')
const context=gameboard.getContext('2d')
const scores=document.getElementById('scoreval')
const HEIGHT=gameboard.height;
const WIDTH=gameboard.width;
const button=document.querySelector('button');
const level=document.getElementById('input')
let snakespeed=0;

//------------- for Selecting level ----------------//
button.addEventListener('click',()=>{
    const levels=level.value;
    if(levels=='Easy')
    {
        snakespeed=300;
        console.log(snakespeed);
    }
    else if(levels=='Medium')
    {
        snakespeed=150;
        console.log(snakespeed);
    }
    else{
        snakespeed=90;
        console.log(snakespeed);
    }
})



const Fs=20;
let fx;
let fy;
let speedx=20;
let speedy=0;
let score=0;
let over=true;
let started=false;

let snake=[
{x:Fs*3,y:0},
{x:Fs*2,y:0},
{x:Fs,y:0},
{x:0,y:0}
];

window.addEventListener('keydown',keypress)




startGame();

function startGame()
{
    context.fillStyle ='#212121';
    //fillRect(Xstrat,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
    //calling();
}

function clearboard()
{
    context.fillStyle='#212121';
    context.fillRect(0,0,WIDTH,HEIGHT)
}

function createFood()
{
    fx=Math.floor(Math.random()*WIDTH/Fs)*Fs;
    fy=Math.floor(Math.random()*HEIGHT/Fs)*Fs;

}

function displayFood()
{
    context.fillStyle='red';
    context.fillRect(fx,fy,Fs,Fs)
}

function drawSnake()
{
    context.fillStyle='aqua'
    context.strokeStyle='#212121';
    snake.forEach(snk=>
        {
            context.fillRect(snk.x,snk.y,Fs,Fs)
            context.strokeRect(snk.x,snk.y,Fs,Fs)
        })
}

function movesnake()
{
 const head ={x:snake[0].x+speedx,y:snake[0].y+speedy} 
 snake.unshift(head)
 if(snake[0].x==fx && snake[0].y==fy)
 {
    score+=1;
    scores.textContent=score;
    createFood();
 }
 else{
    snake.pop()
 }


}





function calling()
{
    if(over){
        setTimeout(() => {
            clearboard();
            displayFood();
            movesnake();
            drawSnake();
            gameover();
            calling();
        }, snakespeed);
    }
  else{
    clearboard();
    context.font="bold 50px Times"
    context.fillStyle="Red"
    context.textAlign="center"
    context.fillText("GameOver Dude!!",WIDTH/2,HEIGHT/2)
  }
}

function keypress(event){
   if(!started)
   {
    started=true;
    calling();
   }
  const left=37;
  const up=38;
  const right=39;
  const down=40;

  switch(true)
  {
    case(event.keyCode==left && speedx!=Fs):
        speedx=-Fs;
        speedy=0;
        break;
        case(event.keyCode==up && speedy!=Fs):
        speedx=0;
        speedy=-Fs;
        break;
        case(event.keyCode==right && speedx!=-Fs):
        speedx=Fs;
        speedy=0;
        break;
        case(event.keyCode==down && speedy!=-Fs):
        speedx=0;
        speedy=Fs;
        break;

  }


}
function gameover()
{
    switch(true)
    {
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        over=false;
        break;

    }
}
