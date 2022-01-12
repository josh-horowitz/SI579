// We wrap all the JS in a function as a way to contain it so it doesn't
// risk conflicting with other loaded javascript
(function() {
    const addStuff = document.querySelector('#javascript-will-add-content');
    addStuff.textContent = 'This text was added via a dedicated JavaScript file';
 })();


 // This accomplishes the same thing, but with modern syntax. 
 // This is the recommended syntax, but for those new to JavaScipt, it is 
 // helpful to see the word "function" to describe functions.
 //
 // The differences between function() and () => aren't a concern until 
 // you get into more complex JavaScript
 /*
 (() => {
    const addStuff = document.querySelector('#javascript-will-add-content');
    addStuff.textContent = 'This text was added via a dedicated JavaScript file';
 })();
*/