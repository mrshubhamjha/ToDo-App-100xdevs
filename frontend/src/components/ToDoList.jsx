import { useState, useEffect } from "react";

export function TodoList() {
    const [todos, setTodos] = useState([]);

    // Fetch todos when the component mounts
    useEffect(() => {
        fetch("http://localhost:3000/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(error => console.error("Error fetching todos:", error));
    }, []);

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id} style={{ marginBottom: "20px" }}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    
                    <button onClick={() => {
                        fetch("http://localhost:3000/todo", {
                            method: "PUT",
                            body: JSON.stringify({ id: todo._id }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then(async (res) => {
                            const json = await res.json();
                            alert(JSON.stringify(json));
                        })
                        .catch((error) => console.error("Error updating todo:", error));
                    }}>
                        {todo.completed ? "Completed" : "Mark as Complete"}
                    </button>
                </div>
            ))}
        </div>
    );
}
