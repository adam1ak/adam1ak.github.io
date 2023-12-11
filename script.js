let randomCountry;
let randomCountryFlag;
let userInput;
let points = 0;
let i = 0;
let tries = 1;
let drawnNumbers = [];
let userInputs = [];
let usedWords = document.getElementById('usedWords');
const optionList = document.getElementById('browsers');
const countryFlag = document.getElementById('countryFlag');
const overlayBlock = document.querySelectorAll(".overlay-block");
const apiURL = 'https://restcountries.com/v3.1/all';

async function fetchRandomCountry() {
    try {
        const response = await fetch(apiURL);
        const apiData = await response.json();
        const random = Math.floor(Math.random() * apiData.length);
        randomCountry = apiData[random].name.common;
        randomCountryFlag = apiData[random].flags.png;
        countryFlag.src = randomCountryFlag;
        console.log(randomCountry);
        for(let i = 0; i <= apiData.length; i++){
            const option = document.createElement('option');
            option.value = apiData[i].name.common;
            optionList.appendChild(option);
        }
    } catch (error) {
        console.error('Error:', error);
        countryFlag.src = apiData[0].flag.png;
    }
}

function randomBlock() {
    let random = Math.floor(Math.random() * overlayBlock.length);
    if (drawnNumbers.length === overlayBlock.length) {
        console.log("All numbers have been drawn");
        return;
    }
    while (drawnNumbers.includes(random)) {
        random = Math.floor(Math.random() * overlayBlock.length);
    }
    drawnNumbers.push(random);
    overlayBlock[drawnNumbers[i]].style.opacity = "0";
    overlayBlock[drawnNumbers[i]].style.transition = "all 0.5s ease-in-out";
    i++;
}
function randomBlockReset() {
    for (let i = 0; i < overlayBlock.length; i++) {
        overlayBlock[i].style.opacity = "1";
        overlayBlock[i].style.transition = "none";
    }
    drawnNumbers = [];
    i = 0;
    tries = 1;
    userInputs = [];
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').focus();
    usedWords.innerHTML = "";
    optionList.innerHTML = "";
}

async function getValue() {
    const response = await fetch(apiURL);
    const apiData = await response.json();
    userInput = document.getElementById('userInput').value;
    for(let i = 0; i <= apiData.length; i++){
        if(userInput.toLowerCase() === (apiData[i].name.common).toLowerCase()){
            if(!userInputs.includes(userInput)){
                userInputs.push(userInput);
                compareInput();
                break
            }else{
                alert('You have already entered this country');
                document.getElementById('userInput').value = "";
                break;
            }
        }
    }
    usedWords.innerHTML = "";
    userInputs.forEach((userInput) => {
        let li = document.createElement('li');
        li.innerHTML = `Your input ${userInput}`;
        usedWords.appendChild(li);
    });
}

function compareInput() {
    if (userInput.toLowerCase() === randomCountry.toLowerCase()) {
        points++;
        alert(`correct! ${randomCountry} is the correct answer, you have: ${points}. points`);
        document.getElementById('userInput').value = "";
        fetchRandomCountry();
        randomBlockReset();
    } else {
        if(tries <= 5){
            tries++;
            document.getElementById('userInput').value = "";
            randomBlock();
            console.log(tries);
        }else{
            randomBlock();
            // allert game over
            // dodaj alert czy gra znowu?
            // dodac mozliwosc timera
            // czy wieksza czy mniejsza od wylosowanego kraju
            document.getElementById('userInput').disabled  = true;
        }
    }
}
function game(){
    fetchRandomCountry();
}
game();