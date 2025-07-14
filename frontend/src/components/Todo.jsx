
import { useState,useEffect } from "react";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const API_URL = "http://localhost:8000/api/todos";

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      console.log("Response" , res)
      const data = await res.json();
      setTodoList(data);

    } catch (err) {
      console.error("error fetching todos: ", err);
    }
  }
  useEffect(()=> {
    fetchTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoInput.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: todoInput,
      completed: isChecked,
    };

    try {

      const res = fetch(API_URL)

    setTodoList([...todoList, newTodo]);
    setTodoInput("");
    setIsChecked(false);
      
    } catch (err) {
      console.error("failed to add todo:", err)
    }

    
  };

  const toggleComplete = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => 
    todo.id !== id);

    setTodoList(updatedTodos);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-3xl">
      <h1 className="text-3xl text-purple-600 font-bold mb-6">TODO it!</h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 mb-6 text-red-400"
      >
        <input
          type="text"
          placeholder="Enter your todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="px-3 py-1 text-base rounded border focus:outline-none focus:ring-2 focus:ring-red-400"
        />

      

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
        >
          ADD
        </button>
      </form>

      <div className="w-full max-w-md">
        {todoList.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No todos yet.</p>
        ) : (
          <ul className="space-y-2">
            {todoList.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between px-4 py-2 border rounded ${
                  todo.completed ? "bg-green-300" : "bg-white"
                }`}
              >
                <span
                  className={`text-lg ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => toggleComplete(todo.id)}
                  className="text-sm bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>

                 <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-sm bg-red-600 px-2 py-1 rounded hover:bg-gray-400"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

 
    </div>
  );
};

export default Todo;
