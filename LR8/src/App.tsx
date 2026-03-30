import React, { useState } from 'react';
import TaskBoard from './TaskBoard';
import TaskForm from './TaskForm';
import { Task } from './types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div>
      <h1>Type-Safe Task Dashboard</h1>
      <TaskForm onAdd={(task) => setTasks((prev) => [...prev, task])} />
      <TaskBoard />
    </div>
  );
};

export default App;