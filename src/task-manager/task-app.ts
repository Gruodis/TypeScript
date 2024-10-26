// src/introduction/03-task-manager/app.ts
interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}
// src/introduction/03-task-manager/app.ts
class TaskManager {
    private tasks: Task[] = [];
    private nextId: number = 1;

    addTask(title: string, description: string) {
        const newTask: Task = {
            id: this.nextId++,
            title,
            description,
            completed: false,
        };
        this.tasks.push(newTask);
    }

    // Add other methods to get, update, and delete tasks
    getTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: number): Task | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    updateTask(id: number, updatedTask: Task): void {
        const index = this.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
            this.tasks[index] = updatedTask;
        }
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    displayTasks(): void {
        this.tasks.forEach((task) => {
            const taskList = document.getElementById('task-list');
            if (taskList) {
                const taskDiv = document.createElement('div'); // Create a new div for each task
                taskDiv.classList.add('task');
                taskDiv.textContent = `Task ${task.id}: ${task.title}, Description: ${task.description}`;
                taskList.appendChild(taskDiv); // Append the div to the task list
            } else {
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
