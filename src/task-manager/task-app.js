"use strict";
// src/introduction/03-task-manager/app.ts
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    addTask(title, description) {
        const newTask = {
            id: this.nextId++,
            title,
            description,
            completed: false,
        };
        this.tasks.push(newTask);
    }
    // Add other methods to get, update, and delete tasks
    getTasks() {
        return this.tasks;
    }
    getTaskById(id) {
        return this.tasks.find((task) => task.id === id);
    }
    updateTask(id, updatedTask) {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            this.tasks[index] = updatedTask;
        }
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
    displayTasks() {
        this.tasks.forEach((task) => {
            const taskList = document.getElementById('task-list');
            if (taskList) {
                const taskDiv = document.createElement('div'); // Create a new div for each task
                taskDiv.classList.add('task');
                taskDiv.textContent = `Task ${task.id}: ${task.title}, Description: ${task.description}`;
                taskList.appendChild(taskDiv); // Append the div to the task list
            }
            else {
                console.error('Div element not found!');
            }
        });
    }
}
// src/introduction/03-task-manager/app.ts
const taskManager = new TaskManager();
taskManager.addTask('Grocery Shopping', 'Buy milk, eggs, bread');
taskManager.addTask('Pay Bills', 'Pay electricity and internet bills');
taskManager.addTask('Water Plants', 'Water the plants in the garden');
taskManager.addTask('Go for a Walk', 'Take a walk in the park');
const tasks = taskManager.getTasks();
taskManager.displayTasks();
console.log(tasks);
