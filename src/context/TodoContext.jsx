import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};