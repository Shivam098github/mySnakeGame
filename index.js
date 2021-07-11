// Variable declarations

let inputDir={x:0, y:0};
const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const gamesound=new Audio('music.mp3');


let speed=5;
let lastpainttime=0;
let snakeArr=[{x:13,y:15}]
food={x:10,y:5};
let score=0;
let a=2;
let b=16;

//functions

function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime-lastpainttime)/1000)<1/speed)
    {
        return;
    }
    lastpainttime=ctime;
    gameEngine();


}

function isCollide(){
    if(snakeArr[0].x<=0 || snakeArr[0].x>=18 || snakeArr[0].y<=0 || snakeArr[0].y>=18)
    return true;
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y)
        return true;
    }

}

function gameEngine(){
    // updating the snake array and food array
    gamesound.play();
    if(isCollide())
    {
        gamesound.pause();
        gameoversound.play();
        
        alert('Game Over ! Press space bar to continue');
        snakeArr=[{x:13,y:15}];
        inputDir={x:0,y:0};
        // musicSound.play();
        score=0;
    }
    scoreBox.innerHTML="Score: "+score;
    // hiscoreBox.innerHTML="Hi Score: "+hiscore;
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y)
    {
        foodsound.play();
        score+=1;
        scoreBox.innerHTML="Score: "+score;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        
        snakeArr[snakeArr.length]=snakeArr[snakeArr.length-1];
        // snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        food.x=Math.round((a+(b-a)*Math.random()));
        food.y=Math.round((a+(b-a)*Math.random()));
    }

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x=snakeArr[0].x+inputDir.x;
    snakeArr[0].y=snakeArr[0].y+inputDir.y;
    //display the snake and food
    board.innerHTML="";

    //displaying the snake 

    snakeArr.forEach((e,index)=>{
        // console.log(e);
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');   
        }
        else
        {
            snakeElement.classList.add('snbody');
            
        }
        board.appendChild(snakeElement);
    });

    // creating the food element
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    
    
}
//gamelogic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    switch(e.key){
        case "ArrowUp":
            movesound.play();
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            movesound.play();
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            movesound.play();
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            movesound.play();
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
        break;
    }

});