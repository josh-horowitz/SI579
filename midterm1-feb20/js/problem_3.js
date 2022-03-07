const clickCounterButton = document.querySelector('#click-count');

/**
 * Helps us pluralize word formatting.
 *
 * Provides an 's' when needed.
 * For example, we should say '1 car' but '5 cars',
 *
 * @param {number} num
 *   The number of items.
 * @returns {string}
 *   An empty string if num is 1, otherwise an 's'.
 */
 function pluralize(num) {
    if(num === 1) {
        return '';
    } else {
        return 's';
    }
}

// write your code here
let count = 0;
clickCounterButton.addEventListener('click', () => {
    count += 1;
    clickCounterButton.textContent = `You clicked the button ${count} time${pluralize(count)}`
})