addTask('test1');
addTask('test2', 1639944400000);

function addTask(description, dueTime){
    const taskList = document.querySelector('#task_list');
    const newTask = document.createElement('li');

    newTask.innerHTML = `${description} ${dueTime ? `<span class="due">${new Date(dueTime).toLocaleDateString()} ${new Date(dueTime).toLocaleTimeString()}</span>` : ''} <button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;

    taskList.appendChild(newTask);
    const doneButton = newTask.querySelector('.done');
    doneButton.addEventListener('click', (e) => {
        e.target.parentElement.remove();
    })
}

function clearDescription(description){
    description.value = '';
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

const addTaskButton = document.querySelector('#add_task');
addTaskButton.addEventListener('click',  (e) => {
    const description = document.querySelector('#task_description_input');
    const dueDateInput = document.querySelector('#duedate_input');
    const dueTimeInput = document.querySelector('#duetime_input');
    addTask(description.value, dateAndTimeToTimestamp(dueDateInput, dueTimeInput));
    clearDescription(description);
})


const description = document.querySelector('#task_description_input');
description.addEventListener('keydown', (e) => {
    if(e.code === 'Enter'){
        addTask(description.value, null);
        clearDescription(description)
    }
})

