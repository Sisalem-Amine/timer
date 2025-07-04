import { scramble } from "../JS/scramble.js";
import { setUpTimer } from "../JS/timer.js";
import { runTimer } from "../JS/timer.js";
import { stopTimer } from "../JS/timer.js";

let scrambleType = '3x3';
let myTimeOut;
let isSpaceDown = false;
let isTimeRunning = false;

function updateUI(type)
{
    let lenght;
    let mode;

    switch(type){
        case '3x3':
            lenght = 20;
            mode = 'standard';
            break;
        case '2x2':
            lenght = Math.floor(Math.random() * 3) + 9;
            mode = 'standard';
            break;
        case 'oll':
            mode = 'practiseOLL';
            break;
        case 'pll':
            mode = 'practisePLL';
            break;
        default :
            lenght = 20;
            mode = 'standard';
    }

    let scrambleString = scramble(lenght, mode);
    document.getElementById('scramble-p').textContent = scrambleString;
}

document.getElementById('scramble-options').addEventListener("change", function (){
    scrambleType = this.value;
    updateUI(scrambleType);
});

document.getElementById('change-scramble').addEventListener('click', () => {
    updateUI(scrambleType);
});

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if(e.code === 'Space'){
        if(!isSpaceDown && !isTimeRunning){
            isSpaceDown = true;
            myTimeOut = setTimeout(() => {
                setUpTimer('timer-p', ['scrambler', 'scramble']);
                isTimeRunning = true;
            }, 800);
        }
        else if(isTimeRunning && !isSpaceDown)
        {
            stopTimer(['scrambler', 'scramble']);
            updateUI(scrambleType);
            isSpaceDown = false;
            isTimeRunning = false;
        }
    }
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.code === 'Space'){
        if(isTimeRunning){
            runTimer('timer-p');
        }
        else{
            clearTimeout(myTimeOut);
        }
        isSpaceDown = false;
    }
});

updateUI(scrambleType);