// Define UI Variables
const form      = document.querySelector('#task-form')
const taskList  = document.querySelector('.collection')
const clearBtn  = document.querySelector('.clear-tasks')
const filter    = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    // this event gets fired when the document is loaded
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask)
    // Remove task event
    taskList.addEventListener('click', removeTask)
    // Clear all tasks
    clearBtn.addEventListener('click', clearTasks)
    // Filter the tasks based on what we type in the filter input
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks from local storage
function getTasks() {
    let tasks
    // check if we have items with the key of tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        // local storage store only strings
        // if we do have tasks, parse them and store them in the tasks array
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // loop through the tasks we got from local storage and create a li element for each
    tasks.forEach(function(task) {
        // create li element for the task
        const li = document.createElement('li')
        li.className = 'collection-item'
        li.appendChild(document.createTextNode(task))

        // create a delete a element for the task
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>'

        li.appendChild(link)
        taskList.appendChild(li)
    })
}

// Add Task
function addTask(e) {
    // validate the input of the user
    if (taskInput.value === '') {
        alert('Add a Task')
    }

    // create li element for the new task
    const li = document.createElement('li')
    li.className = 'collection-item'
    li.appendChild(document.createTextNode(taskInput.value))

    // create a delete a element for the new task
    const link = document.createElement('a')
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    li.appendChild(link)
    taskList.appendChild(li)

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value)

    // clear the input
    taskInput.value = ''

    e.preventDefault()
}

// Store the task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks
    // check if we have items with the key of tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        // local storage store only strings
        // if we do have tasks, parse them and store them in the tasks array
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // push the new task to the array
    tasks.push(task)
    // update the local storage with the new modified tasks array 
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e) {
    // if the target's parents is an element of delete-item class then that target is the x button
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you Sure?')) {
            // remove the parent of the parent of that x button which is thw whole li element
            e.target.parentElement.parentElement.remove()

            // Remove from localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks
    // check if we have items with the key of tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        // local storage store only strings
        // if we do have tasks, parse them and store them in the tasks array
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    // loop through the tasks
    tasks.forEach(function(task, index) {
        // if the text content of any task matches the given task
        if (taskItem.textContent === task) {
            // then that's the task we wanna delete
            tasks.splice(index, 1)
        }
    })
    // update the local storage with the new modified array
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// clear all tasks
function clearTasks() {
    // taskList.innerHTML = ''

    // faster solution
    // as long as we have a first child in the task list
    while (taskList.firstChild) {
        // remove it till we don't have anymore
        taskList.removeChild(taskList.firstChild)
    }

    // Clear all tasks from local storage
    clearTaskFromLocalStorage()
}

// Clear all tasks from local storage
function clearTaskFromLocalStorage() {
    localStorage.clear()
}

// filter the tasks based on what we type in the filter input
function filterTasks(e) {
    // get what we type in the filter input
    const text = e.target.value.toLowerCase()
    // loop through all the tasks list
    document.querySelectorAll('.collection-item').forEach(function(task) {
        // get the text content of the first child of the task (the task item) 
        const item = task.firstChild.textContent
        // if what we typed inside the filter input is in the task item
        if (item.toLowerCase().indexOf(text) != -1) {
            // display it
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}