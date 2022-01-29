/**
 * Problem 1: Assign the variable `thatBox` to 
 * represent the element with id `thebox`
 */

const thatBox = document.querySelector('#thebox');

/**
 * Problem 2: Write the text of `thatBox` to 
 * the console (using console.log)
 */
console.log(thatBox.textContent);

/**
 * Problem 3: Add the class `color-change` to `thatBox`
 */
thatBox.classList.add('color-change');

/**
 * Problem 4: Add the class `red` to `thatBox`. 
 * Problem 4.1: Using setInterval: 
 * After 1 second, the `red` class should be removed and replaced with `blue`.
 * This every-second red/blue exchange should continue indefinitely
 */
thatBox.classList.add('red')
const myInterval = setInterval(function() {
    thatBox.classList.toggle('red');
    thatBox.classList.toggle('blue');
}, 1000);


/**
* Problem 5:
* 
* Create the variable `fruitListItems`. This should represent *all* 
* list elements that are descendants of the element with id `fruit-list`
*/
const fruitListItems = document.querySelectorAll('#fruit-list li');

/**
 * Problem 6:
 * 
 * Iterate through `fruitListItems`, console log the text of each.
 * 
 */

fruitListItems.forEach(item => console.log(item.textContent))

/**
 * Problem 7:
 * 
 * Copy the iterator for `fruitListItems` in problem 6, 
 * - remove the console.log
 * - each `item` should have it's color changed to green
 *   via an inline style.
 *  
 */
 fruitListItems.forEach(item => item.style.color = 'green')


/**
 * Problem 8:
 * 
 * An array called `fruits` already eists
 * Create the variable `fruitWithoutA` as an array that filters out the items 
 * in `fruits` that include the lowercase or uppercase letter 'a'.
 * 
 * Hint: while this can be done with loops, this *can* be done in
 * a single (readable and well formatted) line. It's perfectly fine to do
 * this in a loop if that's your preference, though
 */
const fruitWithoutA = fruits.filter(fruit => !(fruit.includes('a') || fruit.includes('A')));

/**
 * Problem 9:
 * Create a function `stopChanging` that cancels the interval created
 * in problem 4.
 */

function stopChanging() {
    clearInterval(myInterval);
}

/**
 * Problem 10:
 * Create the variable `travelElement` that represents the element 
 * with the id `traveler`.
 * 
 * Problem 10.1:
 * Move `traveler` into the element with the id `destination`
 * 
 */
const travelElement = document.querySelector('#traveler');
document.querySelector('#destination').append(travelElement);


/* 
 * Problem 11: create a function `startTransitions` that adds
 * the attribute `data-transitions` (with a value of TRUE) to the element with id `transition-box`
*/
function startTransitions() {
    const transitionBox = document.querySelectorAll('#transition-box');
    transitionBox.forEach(box => box.setAttribute('data-transitions','TRUE'));
}
