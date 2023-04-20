import React, { useState } from "react";

const TodoList = () => {
  const initialTodoState = { id: null, task: "" };
  const [todo, setTodo] = useState(initialTodoState);
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const saveTodo = () => {
    const { task } = todo;
    const newTodo = { id: Date.now(), task: task };
    setTodos([...todos, newTodo]);
    setTodo(initialTodoState);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-list">
      <h4>To do List</h4>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.task}
            <button onClick={() => removeTodo(t.id)} className="btn btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="todo-form">
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <input
            type="text"
            className="form-control"
            id="task"
            required
            value={todo.task}
            onChange={handleInputChange}
            name="task"
          />
        </div>

        <button onClick={saveTodo} className="btn btn-success">
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoList;

