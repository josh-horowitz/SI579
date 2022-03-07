const flashingBlock = document.querySelector('#color-timer-target');

flashingBlock.classList.add('blue')
setInterval(function() {
    flashingBlock.classList.toggle('yellow');
    flashingBlock.classList.toggle('blue');
}, 2000);