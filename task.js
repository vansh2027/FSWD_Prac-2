// task.js
export const tasks = [];

function addTask(task) {
    try {
        if (!task.title || !task.dueTime || !task.priority) {
            throw new Error("Task must have title, dueTime, and priority.");
        }
        tasks.push(task);
        updateTaskList();
        showNotification("Task added successfully!");
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function sortTasksByPriority() {
    tasks.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    updateTaskList();
}

function getTasksDueWithin(minutes) {
    const now = 0;
    const dueTasks = tasks.filter(task => task.dueTime <= now + minutes);
    return dueTasks;
}

function scheduleReminders() {
    tasks.forEach(task => {
        setTimeout(() => {
            showNotification(`Reminder: Task "${task.title}" is due now!`);
        }, task.dueTime * 60000);
    });
}

function updateTaskList() {
    const urgentTasks = getTasksDueWithin(10);
    const laterTasks = tasks.filter(task => task.dueTime > 10);
    
    updateTaskSection('urgentTaskList', urgentTasks);
    updateTaskSection('laterTaskList', laterTasks);
}

function updateTaskSection(elementId, taskList) {
    const section = document.getElementById(elementId);
    section.innerHTML = '';
    taskList.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    taskList.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.priority}`;
        taskElement.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>Due in ${task.dueTime} minutes - ${task.priority} Priority</p>
            </div>
        `;
        section.appendChild(taskElement);
    });
}

function showNotification(message, type = 'info') {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notifications.insertBefore(notification, notifications.firstChild);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

export { addTask, sortTasksByPriority, getTasksDueWithin, scheduleReminders };
