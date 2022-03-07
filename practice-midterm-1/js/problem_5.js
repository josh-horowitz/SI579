const timeSelectElement = document.querySelector('#time-select');
const secondsOldElement = document.querySelector('#seconds-old')

function getInputTimestamp() {
    const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
    return timeSelectElement.valueAsNumber + timezoneOffset;
}

timeSelectElement.addEventListener('change', () => {
    setInterval(() => {
        secondsOldElement.textContent = Math.round((new Date().getTime() - getInputTimestamp())/1000)
    }, 1000)
});

