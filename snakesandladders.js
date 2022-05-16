



let snakesandladders = {

    playerCount: 2,

    players: [
        {
            id:"player1",
            character: "./img/char1.svg",
            pos:0,
            name:"William"
        },
        {
            id:"player2",
            character: "./img/char2.svg",
            pos:0,
            name:"sophie"
        },
        
       
    ],

    characters: {
        char1: {
            id:"char1",
            src: "./img/char1.svg",
        },
        char2: {
            id:"char2",
            src: "./img/char2.svg"
        }
    },

    // START SETTINGS
    settingType:"playerCount",
settings: ()=>{
    switch (snakesandladders.settingType){
        case "playerCount":
            setPlayerCount();
        break;
        case "playerName":
            setPlayerName();
        break;
    }

    function setPlayerCount(){
                    
        snakesandladders.playerCount = parseFloat(document.getElementById("playerCountInput").value);
        for(let i=0; i<parseFloat(document.getElementById("playerCountInput").value);i++){
            snakesandladders.players.push({
                id: `player${i+1}`,
                pos:0
            });
        
    }
    snakesandladders.settingType = "playerName";
    document.getElementById("settingTitle").textContent = `Set player${snakesandladders.currentPlayer+1}'s  name`;
    document.getElementById("settingOption").innerHTML = `<label for='playerNameInput'>Player Name&nbsp;</label><input value='player${snakesandladders.currentPlayer+1}' type='text' name='playerNameInput' id='playerNameInput'/>`;
    }

    function setPlayerName(){
        snakesandladders.players[snakesandladders.currentPlayer].name = document.getElementById("playerNameInput").value;
    }
    // CONTINUE HERE
    // 
    // 
    // 
    // 
    // 

},
    // END SETTINGS

// START SETUP
setup: ()=>{
const mainGrid = document.getElementById("mainGrid");
const gridItem = document.createElement("div");
gridItem.className = "grid--item";
for(let i = 0;i<100;i++){
    const tempGridItem = gridItem.cloneNode(false);
    mainGrid.append(tempGridItem);
}

let gridItems = document.querySelectorAll(".grid--item");
const gridItemsLength = gridItems.length;
// SET ROWS
let rowNum = 1;
for(let i = 1; i<=gridItemsLength; i++){
    gridItems[i-1].classList.add(`row${rowNum}`)

if(i % 10 == 0 && i > 1){
    rowNum++;
}
}

// NUMBER THEM
rowNum = 1;
let counter = 0;
let colNum = 0;
let currentRow;
const tempDiv = document.createElement("div");
tempDiv.className = "grid--num";
for(let i = 0; i < 100; i++){
    if(i%10==0&&i>2){
        rowNum++;
        colNum = 0;
        currentRow = document.querySelectorAll(`.row${rowNum}`);
    }
    if(i%10==0){
        currentRow = document.querySelectorAll(`.row${rowNum}`);
        switch (rowNum){
            case 1:
            counter = 101;
            break;
            case 2:
            counter = 80;
            break;
            case 3:
            counter = 81;
            break;
            case 4:
            counter = 60;
            break;
            case 5:
            counter = 61;
            break;
            case 6:
            counter = 40;
            break;
            case 7:
            counter = 41;
            break;
            case 8:
            counter = 20;
            break;
            case 9:
            counter = 21;
            break;
            case 10:
            counter = 0;
            break;
        }
    }
    if(rowNum%2==0){
        counter++;
    }else{
        counter--;
    }
    
    const currentDiv = tempDiv.cloneNode(false);
    currentDiv.textContent = counter;
    currentRow[colNum].append(currentDiv)
    currentRow[colNum].setAttribute("value", counter);
    currentRow[colNum].classList.add(`col${counter}`);
    colNum++;

}


// PLACE PLAYERS AT START
const character = document.createElement("div");
character.className = "character";
for(let i = 0; i<snakesandladders.players.length; i++){
    const tempChar = character.cloneNode(false);
    tempChar.style.backgroundImage = `url('${snakesandladders.players[i].character}')`;
    tempChar.style.transform = `translateX(-${(i+1)*100}%)`;
    tempChar.setAttribute("value", `-${(i+1)*100}`);
    tempChar.setAttribute("id", snakesandladders.players[i].id)
    document.querySelector(".col1").append(tempChar);
}

// CALC FIRST QUESTION

snakesandladders.calcMath();

// END SETUP
},

movePlayer: (player)=>{
     let amount = Math.round(Math.random() * (6 - 1) + 1);
    let moveCounter = 0;
    moveLoop();
    function moveLoop(){
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        playerChar.style.transform = `translateX(0%)`;

        if (moveCounter < amount){
            setTimeout(()=>{
                moveCounter++
                const playerChar = document.getElementById(snakesandladders.players[player].id);
                document.querySelector(`.col${snakesandladders.players[player].pos + moveCounter}`).append(playerChar);
                playerChar.style.transform = `translateX(-100%)`;
                moveLoop();
            }, 200);
    
        } else {
            snakesandladders.players[player].pos += amount;
        }
        
    } 
},
calcMath: () =>{
    document.getElementById("playerTurn").textContent = `It's ${snakesandladders.players[snakesandladders.currentPlayer].name}'s turn!`;
    const questionType = Math.round(Math.random() * (4 - 1) + 1);
    switch(questionType){
        case 1:
            addQuestion();
        break;
        case 2:
            subQuestion();
        break;
        case 3:
            mulQuestion();
        break;
        case 4:
            divQuestion();
        break;
    }

    function addQuestion(){
        const num1 =  Math.round(Math.random() * (50 - 1) + 1);
        const num2 = Math.round(Math.random() * (50 - 1) + 1);
        snakesandladders.mathQuestion = `${num1}+${num2}`;
        snakesandladders.mathAnswer = num1 + num2;
    }
    function subQuestion(){
        const num1 =  Math.round(Math.random() * (50 - 1) + 1);
        const num2 = Math.round(Math.random() * (num1 - 1) + 1);
        snakesandladders.mathQuestion = `${num1}-${num2}`;
        snakesandladders.mathAnswer = num1 - num2;
    }
    function mulQuestion(){
        const num1 =  Math.round(Math.random() * (10 - 1) + 1);
        const num2 = Math.round(Math.random() * (10 - 1) + 1);
        snakesandladders.mathQuestion = `${num1}x${num2}`;
        snakesandladders.mathAnswer = num1 * num2;
    }
    function divQuestion(){
        const num1 =  Math.round(Math.random() * (20 - 1) + 1);
        let num2 = 0;

        if(num1%4==0){
            if(Math.round(Math.random() * (2 - 1) + 1) == 1){
                num2 = 2;
            }else{
                num2 = 4;
            }
        }else if(num1%2==0){
            num2 = Math.round(Math.random() * (2 - 1) + 1);
        }else if(num1%5==0){
            if(Math.round(Math.random() * (2 - 1) + 1) == 1){
                num2 = 1;
            }else{
                num2 = 5;
            }
        }else if(num1%3==0){
            if(Math.round(Math.random() * (2 - 1) + 1) == 1){
                num2 = 1;
            }else{
                num2 = 3;
            }
        }else{
            num2 = 1;
        }

        snakesandladders.mathQuestion = `${num1}/${num2}`;
        snakesandladders.mathAnswer = num1 / num2;
    }
    document.getElementById("printQuestion").textContent = `What is ${snakesandladders.mathQuestion}?`;
},
testMath:(player)=>{
    if(isNaN(parseFloat(document.getElementById("mathInput").value))){
        alert("enter a number");
    }else{
        const mathInput = parseFloat(document.getElementById("mathInput").value);
        if(mathInput == snakesandladders.mathAnswer){
            if(snakesandladders.currentPlayer < snakesandladders.playerCount - 1){
                snakesandladders.currentPlayer++
            } else{
                snakesandladders.currentPlayer = 0;
            }
            snakesandladders.movePlayer(player);
            snakesandladders.calcMath(); 
        }else{
            if(snakesandladders.currentPlayer < snakesandladders.playerCount - 1){
                snakesandladders.currentPlayer++
            } else{
                snakesandladders.currentPlayer = 0;
            }
            snakesandladders.calcMath();
        }
    }
},
mathAnswer: null,
currentPlayer: 0



}

 snakesandladders.setup();