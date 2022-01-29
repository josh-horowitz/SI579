/**
 * PROBLEM 1
 */
const correct = [];
const p1 = document.querySelector("#p1");

if(typeof thatBox !== 'undefined' && thatBox instanceof Element && thatBox.textContent.includes('I am THAT box')) {
    p1.setAttribute("class", "correct");
    p1.textContent += "thatBox is the element with id `thebox`";
    correct.push(1);
} else {
    let error = '';
    let undeclared = false;
    try { thatBox; }
    catch (e) {
        undeclared = true;
    }
    if(undeclared) {
        error = 'thatBox is  undeclared'
    } else if (typeof thatBox === 'undefined') {
        error = 'thatBox exists, but does not have a value, possibly because it is querying a selector that does not exist'
    } else if (thatBox instanceof Element) {
        error = 'thatBox is a valid element, just not the one you want'
    } else {
        error = 'thatBox exists, but it is not an element';
    }


    p1.textContent += error;
}

/**
 * PROBLEM 2
 */
 const p2 = document.querySelector("#p2");
 if(typeof console.logs[0] !== 'undefined' &&  typeof console.logs[0][0] !== 'undefined' && console.logs[0][0] === 'I am THAT box') {
    p2.setAttribute("class", "correct");
    p2.textContent += "the first console.log call had a value of `I am THAT box`";
    correct.push(2);
} else {
    p2.setAttribute("class", "incorrect");
    p2.textContent += "the first console.log call did not have a value of `I am THAT box`";
}

/**
 * PROBLEM 3
 */
const p3 = document.querySelector("#p3");

if (!correct.includes(2)) {
    p3.textContent += 'problems 1 and 2 must be solved first';
} else if (thatBox.classList.contains('color-change')) {
    p3.setAttribute("class", "correct");
    p3.textContent += 'thatBox has the `color-change` class';
    correct.push(3);
} else {
    p3.textContent += 'thatBox does not have the the `color-change` class';
}


/**
 * PROBLEM 4
 */
const p4 = document.querySelector("#p4");
const p4_1 = document.querySelector("#p4-1");
let p4_message = '';
let p4_1_message = '';

if (!correct.includes(3)) {
    p4_message = 'problems 1-3 must be solved first';
    p4_1_message = 'problems 1-3 must be solved first';
} 

if (thatBox.classList.contains('red')) {
   if (thatBox.classList.contains('color-change')) {
     p4.setAttribute("class", "correct");
     p4_message += 'thatBox has the `red` class added';
     correct.push(4);
   } else {
    p4_message = 'thatBox has the `red` class, but is now missing the `color-change` class';
   }
} else {
    p4_message = 'thatBox does not have the `red` class';
}
if (correct.includes(4)) {
    p4_1_message = 'it will take a moment to determine if this is correct';
    let num_checks = 0;
    let stop = false;
    let switchedToBlue = false;
    const intervalId = setInterval(() => {
        num_checks++;
        if (!switchedToBlue) {
            if (thatBox.classList.contains('blue')) {
                if (thatBox.classList.contains('red')) {
                    p4_1_message = 'thatBox now has the `blue` class, but the `red` class is still present';
                    stop = true;
    
                }
                if (!thatBox.classList.contains('color-change')) {
                    p4_1_message = 'thatBox now has the `blue` class, but the `color-change` class was removed';
                    stop = true;
                }
                if (!stop) {
                    p4_1_message = 'it switched to blue... waiting to see if it switches to red';
                    switchedToBlue = true;
                }
    
            } else {
                p4_1_message = 'waiting for `blue` class'
            }
        } else {
            p4_1_message = 'switched to blue waiting to switch back to red';
            if (thatBox.classList.contains('red')) {
                if (thatBox.classList.contains('blue')) {
                    p4_1_message = 'thatBox switched back to the `red` class, but the `blue` class is still present';
                    stop = true;
    
                }
                if (!thatBox.classList.contains('color-change')) {
                    p4_1_message = 'thatBox switched back to the `red` class, but the `color-change` class was removed';
                    stop = true;
                }
                if (!stop) {
                    p4_1_message = 'thatBox is switching from blue to red!';
                    stop = true;
                    p4_1.setAttribute("class", "correct");
                    correct.push(4.1);

                }
    
            }
        }

        p4_1.textContent = `Problem 4.1: ${p4_1_message}`
        if (stop) {
            clearInterval(intervalId);
        }
        if (num_checks > 20) {
            p4_1.textContent += ' (timed out waiting for changes)'
            clearInterval(intervalId);
        }

    }, 300);
} else {
    p4_1_message = 'problem 4 must be solved first';
}

p4.textContent += p4_message;
p4_1.textContent += p4_1_message;



/**
 * PROBLEM 5
 */
 function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

let p5_message = '' 
const p5 = document.querySelector("#p5");
let undeclared = false
try { fruitListItems; }
catch (e) {
    undeclared = true;
}

if (undeclared) {
    p5_message = 'fruitListItems is undeclared'
} else if (fruitListItems instanceof NodeList) {
    p5_message = 'fruitListItems is a NodeList';
    let fruitArray = [];
    fruitListItems.forEach((item) => {
        fruitArray.push(item.textContent);
    });
    if (fruitArray.join() === fruits.join()) {
        p5.setAttribute("class", "correct");
        p5_message = 'fruitListItems has all the list items in #fruit-list';
        correct.push(5);

    } else {
        p5_message = `fruitListItems does not have expected value. Expected: ${fruits.join()} || Actual: ${fruitArray.join()}`
    }
} else {
    p5_message = 'fruitListItems is not a NodeList'
}

p5.textContent += p5_message;



/**
 * PROBLEM 6
 */
 function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}
const p6 = document.querySelector("#p6");
let p6_message = '';

if (!correct.includes(5)) {
  p6_message = 'requires problem 5 to be solved first';
} else {
    const loglog = console.logs.map((item) => item[0]).splice(1);
    if (arraysEqual(loglog, fruits)) {
        p6.setAttribute("class", "correct");
        p6_message = 'succesfully iterated through fruitListItems and logged the text of each';
        correct.push(6);
    } else {
        p6_message = 'console log output does not have the expected result'. 
        console.error('expected each of these items logged', fruits);
    }
}

p6.textContent += p6_message;




console.logs = [];


/**
 * PROBLEM 7
 */
const p7 = document.querySelector("#p7");
if(!correct.includes(6)) {
    p7.textContent += 'Requires problem 6';
} else {
    const green = [];
    setTimeout(() => {
        fruitListItems.forEach((item) => {
          if (item.style.color === 'green') {
            green.push(item);
          }
        });
        if (green.length === fruitListItems.length) {
            p7.setAttribute("class", "correct");
            p7.textContent += 'inline styles have made the items green';
        } else {
            p7.textContent += 'there are not inline styles making the items green';
        }
    }, 50);
}
const p8 = document.querySelector("#p8");
let p8_message = '';
let fruitWithoutAExists = true;
try { fruitWithoutA; }
catch (e) {
    if (e.name == "ReferenceError") {
        fruitWithoutAExists = false;
    }
}


if (fruitWithoutAExists) {
    if (fruitWithoutA instanceof Array) {
        if (arraysEqual(fruitWithoutA, fruits.filter((fruit) => !(fruit.includes('a') || fruit.includes('A'))))) {
            p8.setAttribute("class", "correct");
            p8_message = 'Fruits that included "A" or "a" were filtered, see the console';
            console.log('look at the a-filtered fruits', fruitWithoutA);
            correct.push(8);
        } else {
            if (fruits.filter((fruit) => fruit.includes('a'))) {
                p8_message = '`fruitWithoutA` has items with lowercase a';
            } else if (fruits.filter((fruit) => fruit.includes('A'))) {
                p8_message = '`fruitWithoutA` has items with uppercase A';
            } else {
                p8_message = '`fruitwithoutA` does not match `fruits` with "a" and "A" items filtered out';
            }
            console.error('this tried to filter fruits with A or a but did not succeed', fruitWithoutA)
        }
    } else {
        p8_message = 'fruitWithoutA is not an array!';
    }   
} else {
    p8_message  = 'fruitWithoutA is undeclared'
}

p8.textContent += p8_message;

const p9 = document.querySelector("#p9");

document.querySelector('#stop-changing-color').addEventListener('click', (e) => {
    setTimeout(() => {
        if(!correct.includes(4.1)) {
            p9.textContent += 'problem 4.1 must be completed first';
            return;
        }
        p9.textContent = 'Problem 9: wait.... checking'
        const thatBoxClasses = thatBox.classList.toString();
        let isSame = true;
        let count = 0;
        const theInterval = setInterval(() => {
             count++;
             if (thatBoxClasses !== thatBox.classList.toString()) {
                 isSame = false;
             }
             if (!isSame || count > 8) {
                clearInterval(theInterval);
             }

         }, 300);
         if (isSame ) {
            p9.setAttribute("class", "correct");
            correct.push(9);
            p9.textContent = 'Problem 9: The color change stopped!';
         } else {
            p9.textContent = 'Problem 9: Seems like a color change is still happening.';
         }
       
    });
});

const p10 = document.querySelector("#p10");
const p10_1 = document.querySelector("#p10-1");
const p10_2 = document.querySelector("#p10-2");

if(typeof travelElement !== 'undefined' && travelElement instanceof Element && travelElement.textContent.includes('I must reach my destination')) {
    p10.setAttribute("class", "correct");
    p10.textContent += "travelElement is the element with id `traveler`";
    correct.push(10);
} else {
    let error = '';
    let undeclared = false;
    try { travelElement; }
    catch (e) {
        undeclared = true;    
    }
    if(undeclared) {
        error = 'travelElement is undeclared'
    } else if (!undeclared && typeof travelElement === 'undefined') {
        error = 'travelElement exists, but does not have a value, possibly because it is querying a selector that does not exist'
    } else if (travelElement instanceof Element) {
        error = 'travelElement is a valid element, just not the one you want'
    } else {
        error = 'travelElement exists, but it is not an element';
    }


    p10.textContent += error;
}


if (document.querySelector('#destination').textContent.includes('I must reach my destination')) {
    p10_1.setAttribute("class", "correct");
    p10_1.textContent += "travelElement has moved to `#destination`";
    correct.push(10.1);
} else {
    p10_1.textContent = `#destination does not have traveler`
}

const p11 = document.querySelector("#p11");

document.querySelector('#show-animation').addEventListener('click', (e) => {
    setTimeout(() => {
        if(document.querySelector('#transition-box[data-transitions]')) {
            p11.setAttribute("class", "correct");
            p11.textContent += "travelElement has moved to `#destination`";
            correct.push(11);
        } else {
            p11.textContent = `data-transitions attribute not added to #transition-box`
        }
    }, 50);
});
