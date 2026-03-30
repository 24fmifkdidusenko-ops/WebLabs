import React from 'react';
import { Task } from './types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  let borderColor = '';
  switch (task.type) {
    case 'bug':
      borderColor = 'red';
      break;
    case 'feature':
      borderColor = 'green';
      break;
  }

  return (
    <div style={{ border: `2px solid ${borderColor}`, padding: '10px', margin: '5px' }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      {task.type === 'bug' && <p>Severity: {task.severity}</p>}
      {task.type === 'feature' && (
        <>
          <p>Priority: {task.priority}</p>
          {task.expectedRelease && <p>Expected Release: {task.expectedRelease}</p>}
        </>
      )}
    </div>
  );
};

export default TaskCard;