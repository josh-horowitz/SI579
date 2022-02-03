(function() {
      // Variables: Assign each button on the page to a variable.
      const startButton = document.querySelector("#start-button");
      const stopButton = document.querySelector("#stop-button");
      const resetButton = document.querySelector("#reset-button");

      // Variable: The time display element.
      const timeDisplay = document.querySelector("#time-display");

      // Variable: stores the start time whenever the stopwatch
      // is started. Declared here so it's available to all functions
      // to update.
      let startTime;

      // Variable: stores the interval id of the once-per-second
      // timer. Declared here so it can be updated or cleared in any
      // function.
      let countInterval;

      // Variable: stores the timer value (how much
      // time has passed since pressing "start"), so this can
      // be increased or reset depending on the function.
      let timerAmount = 0;
      
      // Function: updates the contents of timeDisplay with the
      // current time.
      function renderTimer(){
         timeDisplay.textContent = Math.round(timerAmount/1000);
      }

      // Function: Callback for the setInterval call that fires every 
      // second when the stopwatch is running. This updates the
      // timer amount.
      function updateTimer() {
         const currentTime = new Date().getTime();
         timerAmount = currentTime - startTime;
         renderTimer();
      }
      

      // Function: [Stretch goal] - for enabling/disabling buttons into
      // a single function instead of each event handler.
     
    
      // Event listener: When the start button is clicked:
      // - Update the start time variable with the new start time 
      //   (as a timestamp)
      // - Start a new interval that 
      //       -- fires once per second
      //       -- invokes the callback that updates the timer amount
      //       -- the interval ID is stored in a variable available to
      //          other functions.
      // - Start button disabled
      // - Stop and reset button enabled
      startButton.addEventListener('click',(e) => {
         startTime = (new Date()).getTime() - timerAmount
         countInterval = setInterval(updateTimer, 1000);
         startButton.setAttribute('disabled', true);
         stopButton.removeAttribute('disabled');
         resetButton.removeAttribute('disabled');
      });


      // Event listener: When the stop button is clicked:
      // - Clear the interval updating the timer value.
      // - Start and reset button enabled
      // - Stop button disabled.
      stopButton.addEventListener('click',(e) => {
         clearInterval(countInterval);
         startButton.removeAttribute('disabled');
         stopButton.setAttribute('disabled', true);
         resetButton.removeAttribute('disabled');
      });

      // Event listener: When the reset button is clicked:
      // - Clear the interval updating the timer value.
      // - Set the timer amount back to 0
      // - Call function that updates the timer display
      // - Start button enabled
      // - Stop and reset button disabled.
      resetButton.addEventListener('click',(e) => {
         clearInterval(countInterval);
         timerAmount = 0;
         renderTimer();
         startButton.removeAttribute('disabled');
         stopButton.setAttribute('disabled', true);
         resetButton.setAttribute('disabled', true);
      });
 })();
