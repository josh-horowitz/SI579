// FIX THE CODE BELOW WITH A MINIMAL EDIT
const button = document.querySelector('#clickable-button');

function onButtonClick() {
    document.getElementById("clicked-feedback").textContent = "You clicked the button!";
}

button.addEventListener('click', () => {
    onButtonClick()});