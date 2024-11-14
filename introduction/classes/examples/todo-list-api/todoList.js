import axios from 'axios';
export const fetchTodos = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        return todos;
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};
// console.log("Fetching todos...", fetchTodos());
fetchTodos().then(todos => {
    todos.forEach(todo => {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}`);
    });
});
const fetchData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};
console.log("Fetching todo  X...", fetchData());
