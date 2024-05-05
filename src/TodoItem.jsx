import { useContext } from "react";
import { TodoContext } from "./TodoContext";
import { useState } from "react";

export function TodoItem({ todo }) {
  const [isEdit, setIsEdit] = useState(false);
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  // form
  return (
    <li className="list-item">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log("提交");
          if (isEdit) {
            // 應該用ref不是這樣拿dom資料
            editTodo(todo.id, e.target.editTodoInput.value);
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
            />
          ) : (
            <span data-list-item-text>{todo.name}</span>
          )}
        </label>
        <button onClick={() => deleteTodo(todo.id)} data-button-delete>
          Delete
        </button>

        {isEdit ? (
          <button type="submit" data-button-delete>
            save
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              // 避免表單提交
              e.preventDefault();
              setIsEdit(!isEdit);
            }}
            data-button-delete
          >
            edit
          </button>
        )}
      </form>
    </li>
  );
}
