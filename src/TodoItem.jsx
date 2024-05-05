import { useContext, useRef } from "react";
import { TodoContext } from "./TodoContext";
import { useState } from "react";

export function TodoItem({ todo }) {
  const [isEdit, setIsEdit] = useState(false);
  const editTodoInput = useRef();
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  return (
    <li className="list-item">
      {isEdit ? (
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (isEdit) {
              editTodo(todo.id, editTodoInput.current.value);
            }
            setIsEdit(!isEdit);
          }}
        >
          <label className="list-item-label">
            <input
              checked={todo.completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
            />

            {isEdit ? (
              <input
                autoFocus
                type="text"
                name="editTodoInput"
                defaultValue={todo.name}
                ref={editTodoInput}
              />
            ) : (
              <span data-list-item-text>{todo.name}</span>
            )}
          </label>
          <button onClick={() => deleteTodo(todo.id)} data-button-delete>
            Delete
          </button>

          <button type="submit" data-button-delete>
            save
          </button>
        </form>
      ) : (
        <div>
          <label className="list-item-label">
            <input
              checked={todo.completed}
              type="checkbox"
              data-list-item-checkbox
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
            />
            <span data-list-item-text>{todo.name}</span>
          </label>
          <button onClick={() => deleteTodo(todo.id)} data-button-delete>
            Delete
          </button>

          <button
            type="button"
            onClick={() => {
              setIsEdit(true);
            }}
            data-button-delete
          >
            edit
          </button>
        </div>
      )}
    </li>
  );
}
