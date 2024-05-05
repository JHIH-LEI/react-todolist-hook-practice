import { useRef } from "react";

export function NewTodoForm({ addNewTodo }) {
  const nameRef = useRef();

  function onSubmitHandle(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;

    addNewTodo(nameRef.current.value);
    nameRef.current.value = "";
  }

  return (
    <form id="new-todo-form" onSubmit={onSubmitHandle}>
      <label htmlFor="todo-input">New Todo</label>
      <input type="text" id="todo-input" ref={nameRef} />
      <button type="submit">Add Todo</button>
    </form>
  );
}
