var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/introduction/03-task-manager/app.ts
// import pool from './db'; // Import the database connection pool
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
class TaskManager {
    addTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = (yield pool.execute('INSERT INTO task (title, description, completed) VALUES (?, ?, ?)', [title, description, false])); // Assert the type here
                console.log('Added task with ID:', result.insertId);
            }
            catch (error) {
                console.error('Error adding task:', error);
            }
        });
    }
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield pool.execute('SELECT * FROM task');
                return rows;
            }
            catch (error) {
                console.error('Error fetching tasks:', error);
                return [];
            }
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield pool.execute('SELECT * FROM task WHERE id = ?', [id]);
                return rows[0];
            }
            catch (error) {
                console.error('Error fetching task:', error);
                return undefined;
            }
        });
    }
    updateTask(id, updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool.execute('UPDATE task SET title = ?, description = ?, completed = ? WHERE id = ?', [
                    updatedTask.title,
                    updatedTask.description,
                    updatedTask.completed,
                    id,
                ]);
                console.log('Updated task with ID:', id);
            }
            catch (error) {
                console.error('Error updating task:', error);
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool.execute('DELETE FROM task WHERE id = ?', [id]);
                console.log('Deleted task with ID:', id);
            }
            catch (error) {
                console.error('Error deleting task:', error);
            }
        });
    }
    displayTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.getTasks();
            const taskList = document.getElementById('task-list');
            if (taskList) {
                taskList.innerHTML = ''; // Clear the task list before displaying
                tasks.forEach((task) => {
                    const taskDiv = document.createElement('div');
                    taskDiv.classList.add('task');
                    taskDiv.textContent = `Task ${task.id}: ${task.title}, Description: ${task.description}`;
                    taskList.appendChild(taskDiv);
                });
            }
            else {
                console.error('Div element not found!');
            }
        });
    }
}
const taskManager = new TaskManager();
// Example usage:
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield taskManager.addTask('Grocery Shopping', 'Buy milk, eggs, bread, XXXX');
    yield taskManager.displayTasks();
}))();
