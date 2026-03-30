import React from 'react';
import { TaskProvider } from './TaskContext';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import AddTaskForm from './AddTaskForm';

const App = () => {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Task Manager</h1>
        <AddTaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;