import axios from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// export const fetchTodos = async (): Promise<Todo[]> => {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const todos: Todo[] = await response.json();
//         return todos;
//     } catch (error) {
//         console.error('Error fetching todos:', error);
//         return [];
//     }
// }

// console.log("Fetching todos...", fetchTodos());

// fetchTodos().then(todos => {
//     todos.forEach(todo => {
//         console.log(`ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}`);
//     });
// });
const outputData = document.getElementById("todo-list");

let storeData: string[] = [];

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    if (response.status === 200) {
        // outputData!.innerHTML = JSON.stringify(response.data, null, 2);
        // i want to store data in storeData
    
        storeData = response.data;
        // i want to push data to storeData
        console.log(response.data);
        outputData!.innerHTML = JSON.stringify(storeData);
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
window.onload = () =>  {
    fetchData().then((elements) => {
        elements.forEach((element:any) => {
            console.log(element.id, element.title, element.completed);
    });
});
}

// fetchData().then((todos) => {
//   todos.forEach((todo: Todo) => {
//     console.log(
//     //   `usrID: ${todo.userId}, ID: ${todo.id}, Title: ${todo.title}, Completed: ${todo.completed}`
//     );
//   });
// });
