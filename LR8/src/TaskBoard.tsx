import React, { useState } from 'react';
import { Task, Bug, Feature } from './types';
import TaskCard from './TaskCard';
import { List } from './List';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { type: 'bug', id: 1, title: 'Fix login', status: 'todo', severity: 'high' },
    { type: 'feature', id: 2, title: 'Add dark mode', status: 'in-progress', priority: 1 },
  ]);

  return (
    <div>
      <h2>Task Board</h2>
      <List items={tasks} renderItem={(task) => <TaskCard task={task} />} />
    </div>
  );
};

export default TaskBoard;