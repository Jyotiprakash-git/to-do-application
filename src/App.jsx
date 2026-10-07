import { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./component/TodoForm";
import TodoItem from "./component/TodoItem";

function App() {
  // 1. Initialize state directly from Local Storage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("savedtodo");
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Add Todo
  const addTodo = (todo) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...todo,
      },
    ]);
  };

  // Update Todo
  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // 2. Save to Local Storage whenever todos change
  useEffect(() => {
    localStorage.setItem("savedtodo", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      <div className="bg-gradient-to-r from-blue-900 to-green-800 min-h-screen flex justify-center items-center">
        <div className="w-full max-w-2xl shadow-2xl shadow-black/50 rounded-lg p-6 text-white bg-black/30">
          <h1 className="text-4xl font-bold text-center mb-8">
            Manage your Todos
          </h1>

          <TodoForm />

          <div className="mt-6">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;