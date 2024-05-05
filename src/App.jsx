import { useState, useEffect } from "react";
import "./styles.css";
import { TodoItem } from "./TodoItem";
import { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

const ACTION_TYPE = {
  ADD: "add",
  DELETE: "delete",
  TOGGLE: "toggle",
  CLEAR: "clear",
  EDIT: "edit",
};

const LOCAL_STORAGE_KEY = "todos";

// TODO: 使用套件
function reducer(todos, { payload, type }) {
  switch (type) {
    case ACTION_TYPE.ADD: {
      return [
        ...todos,
        {
          name: payload.newTodoName,
          completed: false,
          id: crypto.randomUUID(),
        },
      ];
    }
    case ACTION_TYPE.TOGGLE: {
      return todos.map((todo) => {
        if (todo.id === payload.todoId)
          return { ...todo, completed: payload.completed };

        return todo;
      });
    }
    case ACTION_TYPE.DELETE: {
      return todos.filter((todo) => todo.id !== payload.todoId);
    }
    case ACTION_TYPE.CLEAR: {
      return [];
    }
    case ACTION_TYPE.EDIT: {
      // const newTodos = [...todos];
      // const editIndex = newTodos.findIndex(
      //   (todo) => todo.id === payload.todoId
      // );
      // newTodos[editIndex] = {
      //   ...todos[editIndex],
      //   name: payload.newTodoName,
      // };

      return todos.map((todo) => {
        if (todo.id === payload.todoId) {
          return { ...todo, name: payload.newTodoName };
        }
        return todo;
      });
    }
    default: {
      throw new Error(`No action found for ${type}`);
    }
  }
}

function App() {
  // const [newTodoName, setNewTodoName] = useState("");
  const [isOnlyShowPending, setIsOnlyShowPending] = useState(false);
  const [filterName, setFilterName] = useState("");

  // const [todos, setTodos] = useState([]);
  // 預設值去locastorage拿, 但好像不能放function?
  // 存進去要是json

  // const todoInLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY)
  //   ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   : [];
  // const [todos, dispatch] = useReducer(reducer, todoInLocalStorage);

  const [todos, dispatch] = useReducer(reducer, [], (initValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value !== null) {
      return JSON.parse(value);
    }
    return initValue;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {}, []);

  function addNewTodo(newTodoName) {
    dispatch({
      type: ACTION_TYPE.ADD,
      payload: {
        newTodoName: newTodoName,
      },
    });
  }

  function toggleTodo(todoId, completed) {
    dispatch({
      type: ACTION_TYPE.TOGGLE,
      payload: {
        completed,
        todoId,
      },
    });
  }

  function deleteTodo(todoId) {
    // setTodos((currentTodos) => {
    //   return currentTodos.filter((todo) => todo.id !== todoId);
    // });
    dispatch({
      type: ACTION_TYPE.DELETE,
      payload: {
        todoId,
      },
    });
  }

  function clearTodos() {
    dispatch({ type: ACTION_TYPE.CLEAR });
    localStorage.removeItem("todo");
  }

  function editTodo(todoId, newTodoName) {
    dispatch({
      type: ACTION_TYPE.EDIT,
      payload: {
        todoId,
        newTodoName,
      },
    });
  }

  function filterTodo(todo) {
    if (isOnlyShowPending && !filterName) {
      return !todo.completed;
    } else if (isOnlyShowPending && filterName) {
      return !todo.completed && todo.name.includes(filterName);
    } else if (!isOnlyShowPending && filterName) {
      return todo.name.includes(filterName);
    } else {
      return todo;
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos: todos.filter(filterTodo),
        addNewTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearTodos,
      }}
    >
      <TodoList />

      {/* <ul id="list">
        {todos.filter(filterTodo).map((todo) => {
          // TODO: context with all todo action function. value可以用object包有所有function
          return (
            <TodoContext.Provider key={todo.id} value={todo}>
              <TodoItem
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </TodoContext.Provider>
          );
        })}
      </ul> */}

      <NewTodoForm addNewTodo={addNewTodo} />

      <button onClick={clearTodos}>clear all todo</button>

      <div>
        <h3>filter control area</h3>
        <label htmlFor="show-pending-todo">
          <input
            onClick={() => setIsOnlyShowPending(!isOnlyShowPending)}
            id="show-pending-todo"
            type="checkbox"
          />
          only show pending todo
        </label>

        <form action="">
          <label htmlFor="filter-name">
            filter by name:
            <input
              id="filter-name"
              type="text"
              onKeyUp={(e) => setFilterName(e.target.value)}
            />
          </label>
        </form>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
