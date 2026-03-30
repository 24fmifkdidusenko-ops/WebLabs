import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';

const TaskItem = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const toggleComplete = () => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const handleEdit = () => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, title: editTitle } : t));
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={toggleComplete}
          >
            {task.title}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

TaskItem.defaultProps = {
  task: { title: 'Unnamed Task', completed: false }
};

export default TaskItem;