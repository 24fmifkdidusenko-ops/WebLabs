import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { Task, Bug, Feature, TaskStatus } from './types';

type TaskType = 'bug' | 'feature';

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<TaskType>('bug');
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<'low' | 'high' | 'critical'>('low');
  const [priority, setPriority] = useState<number>(1);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as TaskType);
    titleRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task =
      type === 'bug'
        ? { type: 'bug', id: Date.now(), title, status: 'todo', severity }
        : { type: 'feature', id: Date.now(), title, status: 'todo', priority };

    onAdd(newTask);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={handleTypeChange}>
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
      </select>
      <input
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {type === 'bug' && (
        <select value={severity} onChange={(e) => setSeverity(e.target.value as Bug['severity'])}>
          <option value="low">Low</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      )}
      {type === 'feature' && (
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          placeholder="Priority"
        />
      )}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;