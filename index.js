const boxes = document.querySelectorAll(".box");
const  gameInfo = document.querySelector(".game-info");
const Button =document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents="";
        box.classList= `box box${index+1}`;
    })
    Button.classList.remove("active");
    gameInfo.innerText= (` Current Player -  ${currentPlayer}`);
}

initGame();

function swapPlayer(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function gameOver(){
    // if((gameGrid[0]==="X" && gameGrid[1]==="X" && gameGrid[2]==="X") || (gameGrid[3]==="X" && gameGrid[4]==="X" && gameGrid[5]==="X") || (gameGrid[6]==="X" && gameGrid[7]==="X" && gameGrid[8]==="X") || (gameGrid[0]==="X" && gameGrid[3]==="X" && gameGrid[6]==="X") || (gameGrid[1]==="X" && gameGrid[4]==="X" && gameGrid[7]==="X") || (gameGrid[2]==="X" && gameGrid[4]==="X" && gameGrid[8]==="X") || (gameGrid[0]==="X" && gameGrid[4]==="X" && gameGrid[8]==="X") || (gameGrid[2]==="X" && gameGrid[4]==="X" && gameGrid[6]==="X")){
    //     Button.classList.add("active");
    //     gameInfo.innerText = "WINNER - X";
    // }
    // else if((gameGrid[0]==="O" && gameGrid[1]==="O" && gameGrid[2]==="O") || (gameGrid[3]==="O" && gameGrid[4]==="O" && gameGrid[5]==="O") || (gameGrid[6]==="O" && gameGrid[7]==="O" && gameGrid[8]==="O") || (gameGrid[0]==="O" && gameGrid[3]==="O" && gameGrid[6]==="O") || (gameGrid[1]==="O" && gameGrid[4]==="O" && gameGrid[7]==="O") || (gameGrid[2]==="O" && gameGrid[4]==="O" && gameGrid[8]==="O") || (gameGrid[0]==="O" && gameGrid[4]==="O" && gameGrid[8]==="O") || (gameGrid[2]==="O" && gameGrid[4]==="O" && gameGrid[6]==="O")){
    //     gameInfo.innerText = "WINNER - O";
    // }

    let answer = "";

    winningPosition.forEach((position)=>{
        if( (gameGrid[position[0]] !=="" ||gameGrid[position[1]] !== "" || gameGrid[position[2]]!=="" ) && (gameGrid[position[0]] ===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }
            //jar winner milala asel tr pointer remove kra
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player -${answer}`;
        Button.classList.add("active");
    }

    //if all of the above condition is not satisfied then the game is tied
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = `Game Tied !`;
        Button.classList.add("active");
    }
} 


function clickHandler(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapPlayer();
        gameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        clickHandler(index);
    })
});

Button.addEventListener("click",initGame);
