// Get elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>${task.text}<span class="delete">Delete</span>`;
    if (task.completed) {
      li.classList.add('complete');
    }
    taskList.appendChild(li);
  });
}

// Add task
addTaskButton.addEventListener('click', function () {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = {
      text: taskText,
      completed: false
    };

    tasks.push(task);
    renderTasks();

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear input field
    taskInput.value = '';
  }
});

// Mark task as complete
taskList.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.task-checkbox')) {
    const taskItem = e.target.parentNode;
    const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    tasks[index].completed = e.target.checked;

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskItem.classList.toggle('complete');
  }
});

// Delete task
taskList.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.delete')) {
    const taskItem = e.target.parentNode;
    const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    tasks.splice(index, 1);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskList.removeChild(taskItem);
  }
});

// Initial rendering of tasks
renderTasks();

