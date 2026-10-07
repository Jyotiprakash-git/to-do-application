import React, { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
  const { toggleComplete, deleteTodo, updateTodo } = useTodo();

  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const saveTodo = () => {
    updateTodo(todo.id, {
      ...todo,
      todo: todoMsg,
    });

    setIsEditable(false);
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg mb-3 ${
        todo.completed ? "bg-green-700" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />

        <input
          type="text"
          value={todoMsg}
          readOnly={!isEditable}
          onChange={(e) => setTodoMsg(e.target.value)}
          className={`flex-1 bg-transparent outline-none px-2 ${
            todo.completed ? "line-through text-gray-400" : ""
          } ${
            isEditable ? "border border-blue-500 rounded px-2 py-1" : ""
          }`}
        />
      </div>

      <div className="flex gap-2 ml-4">
        {isEditable ? (
          <>
            <button
              onClick={saveTodo}
              className="bg-green-500 px-3 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => {
                setTodoMsg(todo.todo);
                setIsEditable(false);
              }}
              className="bg-yellow-500 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditable(true)}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;