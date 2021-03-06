



let snakesandladders = {

    playerCount: 2,

    players: [
        // {
        //     id:"player1",
        //     character: "./img/char1.svg",
        //     pos:0,
        //     name:"William"
        // },
       
    ],

    characters: {
        char1: {
            id:"char1",
            src: "./img/char1.svg",
        },
        char2: {
            id:"char2",
            src: "./img/char2.svg"
        },
        char3: {
            id:"char3",
            src: "./img/char3.png"
        },
        char4: {
            id:"char4",
            src: "./img/char4.png"
        }
    },

    // START SETTINGS
    settingType:"playerCount",
settings: (charID)=>{

    

    switch (snakesandladders.settingType){
        case "playerCount":
            setPlayerCount();
        break;
        case "playerName":
            setPlayerName();
        break;
        case "playerChar":
            setPlayerChar();
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

        snakesandladders.settingType = "playerChar";
        document.getElementById("nextSetting").style.display = "none";
    document.getElementById("settingTitle").textContent = `Set ${snakesandladders.players[snakesandladders.currentPlayer].name}'s Character`;
    document.getElementById("settingOption").innerHTML = `<div onclick="snakesandladders.settings('char3');" class="character-disp" style="background-image:url('./img/char4.png')"></div><div onclick="snakesandladders.settings('char4');" class="character-disp" style="background-image:url('./img/char3.png')"></div><div onclick="snakesandladders.settings('char1');" class="character-disp" style="background-image:url('./img/char1.svg')"></div><div onclick="snakesandladders.settings('char2');" class="character-disp" style="background-image:url('./img/char2.svg')"></div>`;
    }
    

    function setPlayerChar(){
        snakesandladders.players[snakesandladders.currentPlayer].character = snakesandladders.characters[charID].src;
        if(snakesandladders.currentPlayer+1<snakesandladders.playerCount){
            snakesandladders.currentPlayer+=1;
            snakesandladders.settingType = "playerName";
    document.getElementById("settingTitle").textContent = `Set player${snakesandladders.currentPlayer+1}'s  name`;
    document.getElementById("settingOption").innerHTML = `<label for='playerNameInput'>Player Name&nbsp;</label><input value='player${snakesandladders.currentPlayer+1}' type='text' name='playerNameInput' id='playerNameInput'/>`;
    document.getElementById("nextSetting").style.display = "block";
            
        } else{
            snakesandladders.setup();
        }
    }
    

},
    // END SETTINGS
preSetup: ()=>{
    document.getElementById("playerCountInput").addEventListener("change", ()=>{
        document.getElementById("playerCountDisp").textContent = document.getElementById("playerCountInput").value})
},
// START SETUP
setup: ()=>{
    document.getElementById("mathInput").addEventListener("keydown", (evt)=>{
        if(evt.key == "Enter"){
            snakesandladders.testMath(snakesandladders.currentPlayer);
        }
    });
    snakesandladders.currentPlayer = 0;
    document.getElementById("settings").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
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
    tempChar.textContent = snakesandladders.players[i].name;
    tempChar.style.transform = `translateX(-${(i+1)*100}%)`;
    tempChar.setAttribute("value", `-${(i+1)*100}`);
    tempChar.setAttribute("id", snakesandladders.players[i].id)
    document.querySelector(".col1").append(tempChar);
}

// CALC FIRST QUESTION

snakesandladders.calcMath();
document.getElementById("mathInput").focus();
document.getElementById("popupWrapper").style.display = "flex";
setTimeout(()=>{document.getElementById("popup").style.transform = "scale(1)";}, 1000);
// END SETUP
},

movePlayer: (player)=>{
     let amount = Math.round(Math.random() * (6-1) + 1);
     
    let moveCounter = 0;
    moveLoop();
    function moveLoop(){
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        playerChar.style.transform = `translateX(0%)`;

        
            if (moveCounter < amount){
            setTimeout(()=>{
                moveCounter++;
                if(snakesandladders.players[player].pos+moveCounter>100){
                    snakesandladders.players[player].pos = 82;
                const playerChar = document.getElementById(snakesandladders.players[player].id);
                document.querySelector(`.col82`).append(playerChar);
                }else{
                const playerChar = document.getElementById(snakesandladders.players[player].id);
                document.querySelector(`.col${snakesandladders.players[player].pos + moveCounter}`).append(playerChar);
                playerChar.style.transform = `translateX(-100%)`;
                
                moveLoop();
            }}, 200);
    
        } else {
            snakesandladders.players[player].pos += amount;
            // TEST LADDERS AND STUFF HERE
            setTimeout(()=>{
                snakesandladders.testLadders(player);
                snakesandladders.testSnakes(player);
                snakesandladders.testWin(player);
            }, 200);
        }
        
    } 
},
testLadders: (player)=>{
    if(snakesandladders.players[player].pos == 6){
        snakesandladders.players[player].pos = 15;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col15`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 26){
        snakesandladders.players[player].pos = 74;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col74`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 50){
        snakesandladders.players[player].pos = 69;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col69`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 59){
        snakesandladders.players[player].pos = 79;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col79`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 81){
        snakesandladders.players[player].pos = 100;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col100`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 37){
        snakesandladders.players[player].pos = 57;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col57`).append(playerChar);
    }
},

testSnakes: (player)=>{
    if(snakesandladders.players[player].pos == 96){
        snakesandladders.players[player].pos = 75;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col75`).append(playerChar);
    } else if(snakesandladders.players[player].pos == 92){
        snakesandladders.players[player].pos = 88;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col88`).append(playerChar);
    }
    else if(snakesandladders.players[player].pos == 72){
        snakesandladders.players[player].pos = 4;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col4`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 58){
        snakesandladders.players[player].pos = 40;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col40`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 14){
        snakesandladders.players[player].pos = 8;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col8`).append(playerChar);
    }else if(snakesandladders.players[player].pos == 82){
        snakesandladders.players[player].pos = 63;
        const playerChar = document.getElementById(snakesandladders.players[player].id);
        document.querySelector(`.col63`).append(playerChar);
    }
},

testWin: (player)=>{
    if(snakesandladders.players[player].pos == 100){
        alert(`${snakesandladders.players[player].name} has won!`);
    }else{
        setTimeout(() => {
            document.getElementById("popup").style.transform = "scale(1)";
            document.getElementById("mathInput").focus();
        }, 100);
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
    
    const popup = document.getElementById("popup");
    if(isNaN(parseFloat(document.getElementById("mathInput").value))){
        alert("enter a number");
    }else{
        const mathInput = parseFloat(document.getElementById("mathInput").value);
        if(mathInput == snakesandladders.mathAnswer){
            popup.style.backgroundColor = "rgb(12, 239, 76, 0.800)";
            setTimeout(() => {
                
                popup.style.transform = "scale(0)";
                setTimeout(()=>{
                    popup.style.backgroundColor = "rgb(18, 188, 235, 0.800)";
                    if(snakesandladders.currentPlayer < snakesandladders.playerCount - 1){
                        snakesandladders.currentPlayer++
                    } else{
                        snakesandladders.currentPlayer = 0;
                    }
                    snakesandladders.movePlayer(player);
                    document.getElementById("mathInput").value = "";
                    snakesandladders.calcMath(); 
                    
                }, 500)
            }, 200);
            
        }else{
            popup.style.backgroundColor = "rgb(210, 29, 29, 0.800)";
            setTimeout(() => {
                
                popup.style.transform = "scale(0)";
                setTimeout(()=>{
                    popup.style.backgroundColor = "rgb(18, 188, 235, 0.800)";
                    if(snakesandladders.currentPlayer < snakesandladders.playerCount - 1){
                        snakesandladders.currentPlayer++
                    } else{
                        snakesandladders.currentPlayer = 0;
                    }
                    document.getElementById("mathInput").value = "";
                    snakesandladders.calcMath();
                    setTimeout(()=>{
                        popup.style.transform = "scale(1)";
                        document.getElementById("mathInput").focus();
                    },200)
                }, 500)
            }, 200);
            
        }
    }
},
mathAnswer: null,
currentPlayer: 0



}

snakesandladders.preSetup();