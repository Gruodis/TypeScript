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
} as mysql.PoolOptions);

interface Task {
    id?: number; // Make id optional as the database will auto-generate it
    title: string;
    description: string;
    completed: boolean;
}
interface InsertResult {
    fieldCount?: number;
    affectedRows: number;
    insertId: number;
    info?: string;
    serverStatus?: number;
    warningStatus?: number;
}

class TaskManager {
    async addTask(title: string, description: string) {
        try {
            const [result] = (await pool.execute(
                'INSERT INTO task (title, description, completed) VALUES (?, ?, ?)',
                [title, description, false],
            )) as [InsertResult, unknown]; // Assert the type here

            console.log('Added task with ID:', result.insertId);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async getTasks(): Promise<Task[]> {
        try {
            const [rows] = await pool.execute('SELECT * FROM task');
            return rows as Task[];
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM task WHERE id = ?',
                [id],
            );
            return (rows as Task[])[0];
        } catch (error) {
            console.error('Error fetching task:', error);
            return undefined;
        }
    }

    async updateTask(id: number, updatedTask: Task): Promise<void> {
        try {
            await pool.execute(
                'UPDATE task SET title = ?, description = ?, completed = ? WHERE id = ?',
                [
                    updatedTask.title,
                    updatedTask.description,
                    updatedTask.completed,
                    id,
                ],
            );
            console.log('Updated task with ID:', id);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    async deleteTask(id: number): Promise<void> {
        try {
            await pool.execute('DELETE FROM task WHERE id = ?', [id]);
            console.log('Deleted task with ID:', id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async displayTasks(): Promise<void> {
        const tasks = await this.getTasks();
        const taskList = document.getElementById('task-list');
        if (taskList) {
            taskList.innerHTML = ''; // Clear the task list before displaying
            tasks.forEach((task) => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.textContent = `Task ${task.id}: ${task.title}, Description: ${task.description}`;
                taskList.appendChild(taskDiv);
            });
        } else {
            console.error('Div element not found!');
        }
    }
}

const taskManager = new TaskManager();

// Example usage:
(async () => {
    await taskManager.addTask(
        'Grocery Shopping',
        'Buy milk, eggs, bread, XXXX',
    );
    await taskManager.displayTasks();
})();
