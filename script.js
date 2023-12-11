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
        const countryNames = apiData.map(country => country.name.common);
        randomCountry = apiData[random].name.common;
        randomCountryFlag = apiData[random].flags.png;
        countryFlag.src = randomCountryFlag;
        countryNames.sort();
        for(let i = 0; i < countryNames.length; i++){
            const option = document.createElement('option');
            option.value = countryNames[i];
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
function setupPopup(){
    document.getElementById('userInput').disabled  = true;
    document.querySelector(".popup").style.display = "block";
    document.querySelector("main").style.filter = "blur(5px)";
    document.querySelector("header").style.filter = "blur(5px)";
    document.getElementById("finalScore").innerHTML = points;
}
function closePopup(){
    document.querySelector(".popup").style.display = "none";
    document.querySelector("main").style.filter = "none";
    document.querySelector("header").style.filter = "none";
    document.getElementById('userInput').disabled  = false;
}
function randomBlockReset() {
    for (let i = 0; i < overlayBlock.length; i++) {
        overlayBlock[i].style.opacity = "1";
        overlayBlock[i].style.transition = "none";
    }
}
function resetVariables(){
    drawnNumbers = [];
    i = 0;
    tries = 1;
    userInputs = [];
    optionList.innerHTML = "";
}
function resetAll(){
    randomBlockReset();
    closePopup();
    document.getElementById('userInput').value = "";
    document.getElementById('userInput').focus();
    usedWords.innerHTML = "";
    optionList.innerHTML = "";
    document.getElementById('score').innerHTML = `Score: ${points}`;
}
async function getValue() {
    document.getElementById('score').style.animation = "none";
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
        li.innerHTML = `${userInput}`;
        usedWords.appendChild(li);
    });
}

function compareInput() {
    if (userInput.toLowerCase() === randomCountry.toLowerCase()) {
        points++;
        document.getElementById('userInput').value = "";
        document.getElementById('score').innerHTML = `Score: ${points}`;
        document.getElementById('score').style.animation = "goodPulse 1s ease-in-out";
        document.getElementById('finalScore').innerHTML = points;
        fetchRandomCountry();
        randomBlockReset();
        resetVariables();
    } else {
        if(tries <= 5){
            tries++;
            document.getElementById('userInput').value = "";
            randomBlock();
        }else{
            setupPopup();
            randomBlock();
            resetVariables();
            points = 0;
        }
    }
}
function game(){
    document.getElementById('overlay-blocks').style.opacity = "1";
    document.getElementById('startButton').disabled = true;
    fetchRandomCountry();
    resetAll();
}