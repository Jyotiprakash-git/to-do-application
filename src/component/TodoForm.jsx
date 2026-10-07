import React, { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty todos
    if (!todo.trim()) return;

    addTodo({
      todo: todo.trim(),
      completed: false,
    });

    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full mb-4"
    >
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="flex-1 px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-l-lg outline-none border border-gray-700 focus:border-blue-500"
      />

      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;