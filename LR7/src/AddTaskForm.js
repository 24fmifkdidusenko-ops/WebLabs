import React, { useState, useContext, useRef } from 'react';
import { TaskContext } from './TaskContext';

const AddTaskForm = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const inputRef = useRef();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;