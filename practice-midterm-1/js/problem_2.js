const startButton = document.querySelector('#start-button');
const finishButton = document.querySelector('#finish-button');
const timeTakenOutput = document.querySelector('#time-taken')


let myInterval
let startTime;
// Write your code for problem 2 below
startButton.addEventListener('click', (e) => {
    startTime = new Date().getTime()
    myInterval = setInterval(() => {
        timeTakenOutput.textContent = new Date().getTime() - startTime
    }, 500)
})

finishButton.addEventListener('click', (e) => {
    clearInterval(myInterval)
})

