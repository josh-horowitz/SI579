const messageInput = document.querySelector('#message-input');
const messageStatus = document.querySelector('#message-feedback')

const MAX_CHARS = 50;

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

// Write your code here
messageStatus.textContent = `${Math.abs(MAX_CHARS-messageInput.value.length)} characters left`;

function isTooLong(textNum){
    if (textNum <= MAX_CHARS){
        return 'left'
    }else {
        return 'too long'
    }
}
messageInput.addEventListener('input', () => {
    if (messageInput.value.length <= MAX_CHARS){
        if(messageInput.classList.contains('is-invalid')){
            messageInput.classList.remove('is-invalid');
            messageInput.classList.add('is-valid')
        }
        if (messageStatus.classList.contains('invalid-feedback')){
            messageStatus.classList.add('valid-feedback');
            messageStatus.classList.remove('invalid-feedback');
        }
    } else {
        if(messageInput.classList.contains('is-valid')){
            messageInput.classList.add('is-invalid');
            messageInput.classList.remove('is-valid')
        }
        if (messageStatus.classList.contains('valid-feedback')){
            messageStatus.classList.remove('valid-feedback');
            messageStatus.classList.add('invalid-feedback');
        }
    }
    const charactersLeft = Math.abs(MAX_CHARS-messageInput.value.length)
    messageStatus.textContent = `${charactersLeft} character${pluralize(charactersLeft)} ${isTooLong(messageInput.value.length)}`;
})
