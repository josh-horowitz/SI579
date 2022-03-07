// PROBLEM 1 CODE
const color_target = document.querySelector('#color-target');

const colorButtons = {
    clear:  document.querySelector('#color-clear'),
    red:    document.querySelector('#color-red'),
    green:  document.querySelector('#color-green'),
    blue:   document.querySelector('#color-blue'),
    yellow: document.querySelector('#color-yellow')
};

let oldColor;
for (let color in colorButtons) { // color is 'clear' -> 'red' -> ...
    const colorButton = colorButtons[color];
    colorButton.addEventListener('click', () => {
        color_target.classList.remove(oldColor);
        color_target.classList.add(color);
        oldColor = color;
    });
}