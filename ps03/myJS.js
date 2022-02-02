/*
* Excercise 1
*
*/

let divElement = document.querySelector('#color-block');
let spanElement = document.querySelector('#color-name');
divElement.setAttribute('onclick', 'changeColor()');

/*
* Then write a function that changes the text and the color inside the div
*
*/
function getRgbList(str){
    let rgbString = str.slice(str.indexOf('(')+1, str.length-1);
    return rgbString.split(', ');
}

function componentToHex(c) {
    var hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(l) {
    return "#" + componentToHex(l[0]) + componentToHex(l[1]) + componentToHex(l[2]);
}

function changeColor(){
    //Write a condition determine what color it should be changed to
    //if div color equals text in span, change color. else, change to text in span.
    if(!divElement.style.backgroundColor){
        //change the background color using JS
        divElement.style.backgroundColor = '#0ff';
        //Change the text of the color using the span id color-name
        spanElement.textContent = '#0ff';

    }
    else{
        //change the background color using JS
        divElement.removeAttribute('style');
        //Change the text of the color using the span id color-name
        let backgroundColor = getComputedStyle(divElement).getPropertyValue('background-color');
        debugger
        let backgroundColorList = getRgbList(backgroundColor);
        spanElement.textContent = rgbToHex(backgroundColorList)
        console.log(spanElement.textContent);
        //rgb(123, 123, 123)
        //split substring(+1 on ,

    }
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/
let convertbtn = document.querySelector('#convertbtn');
convertbtn.addEventListener('click', convertTemp);

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){
    //Calculate the temperature here
    cOutput = ((parseInt(document.querySelector('#f-input').value - 32)) * (5/9)).toFixed(2);
    //Send the calculated temperature to HTML
    document.querySelector('#c-output').textContent = cOutput;
}


