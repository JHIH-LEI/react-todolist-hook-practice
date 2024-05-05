import { useContext } from "react";
import { TodoContext } from "./TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos } = useContext(TodoContext);

  return (
    <ul id="list">
      {todos.map((todo) => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </ul>
  );
}
