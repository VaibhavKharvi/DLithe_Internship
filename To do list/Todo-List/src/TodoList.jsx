import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add your task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
