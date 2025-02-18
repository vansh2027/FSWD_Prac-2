// main.js
import { addTask, sortTasksByPriority, scheduleReminders } from './task.js';

document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const dueTime = parseInt(document.getElementById('dueTime').value);
    const priority = document.querySelector('input[name="priority"]:checked')?.value;

    const task = {
        title,
        dueTime,
        priority
    };

    addTask(task);
    sortTasksByPriority();
    scheduleReminders();
    
    // Reset form
    this.reset();
});
