const rhymeWithInput = document.querySelector('#rhyme-with-input');
const showRhymeButton = document.querySelector('#show-rhymes-button');
const clearRhymeButton = document.querySelector('#clear-rhymes-button');
const rhymeList = document.querySelector('#rhymes');

/**
 * Gets rhymes from Datamuse and processes the results.
 *
 * @param {string} rel_rhy
 *   The word you want rhymed with
 * @param callback
 *   The function to invoke after the JSON results are returned from Datamuse.
 */
function getRhymes(rel_rhy, callback) {
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

// Write your code here
showRhymeButton.addEventListener('click', () => {
    rhymeList.textContent = '';
    getRhymes(rhymeWithInput.value, (results) => {
        if (results.length > 0){
            for (const item in results){
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.textContent = results[item].word;
                rhymeList.append(listItem);
            };
        } else{
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = 'No rhyme';
            rhymeList.append(listItem);
        }

    })
});

clearRhymeButton.addEventListener('click', () => {
    rhymeList.textContent = '';
    rhymeWithInput.value = '';
})