// Override console.log so we can store log output in an array that we can
// use to check our work.

// Copy the default console.log() to a new `stdlog` property 
// in `console`. This means calling console.stdlog() will call the
// *original* console.log. We need this copy because we're about to override
console.stdlog = console.log.bind(console); // Bind() is called so console.stdlog works in the same scope as console.log

// Create a `logs` property that stores the console.log() output.
console.logs = [];

// Overwrite the built-in default console.log().
console.log = function(){
    // Store the contents of the call to console log in the newly created
    // `logs` property.
    console.logs.push(Array.from(arguments));
    // Call the original console.log by invoking the copy we made on line 7.
    console.stdlog.apply(console, arguments);
}

const fruits = ['Apple','Apricots','Avocado','Banana','Blackberries','Blackcurrant','Blueberries','Breadfruit','Cantaloupe','Carambola','Cherimoya','Cherries','Clementine','Coconut Meat','Cranberries','Custard-Apple','Date Fruit','Durian','Elderberries','Feijoa','Figs','Gooseberries','Grapefruit','Grapes','Guava','Honeydew Melon','Jackfruit','Java-Plum','Jujube Fruit','Kiwifruit','Kumquat','Lemon','Lime','Longan','Loquat','Lychee','Mandarin','Mango','Mangosteen','Mulberries','Nectarine','Olives','Orange','Papaya','Passion Fruit','Peaches','Pear','Persimmon','Pitaya (Dragonfruit)','Pineapple','Pitanga','Plantain','Plums','Pomegranate','Prickly Pear','Prunes','Pummelo','Quince','Raspberries','Rhubarb','Rose-Apple','Sapodilla','Sapote, Mamey','Soursop','Strawberries','Sugar-Apple','Tamarind','Tangerine','Watermelon'];
fruits.forEach((fruit) => {
  const listItem = document.createElement('li');
  listItem.textContent = fruit;  
  document.querySelector('#fruit-list').append(listItem);
});

