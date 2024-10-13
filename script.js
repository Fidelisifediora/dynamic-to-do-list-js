document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Add event listener for the Add Task button
    addButton.addEventListener('click', () => {
        addTask();
    });

    // Add event listener for the Enter key in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append remove button to the li
        li.appendChild(removeBtn);

        // Append li to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save task to Local Storage
        saveTaskToStorage(taskText);
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            // Create li for each task
            const li = document.createElement('li');
            li.textContent = taskText;

            // Create remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.onclick = function () {
                taskList.removeChild(li);
                removeTaskFromStorage(taskText);
            };

            // Append remove button to li
            li.appendChild(removeBtn);

            // Append li to the task list
            taskList.appendChild(li);
        });
    }
});
