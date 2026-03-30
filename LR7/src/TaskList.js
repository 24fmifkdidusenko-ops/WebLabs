import React, { useContext, useCallback, useMemo } from 'react';
import { TaskContext } from './TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  const activeTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);

  const renderTask = useCallback(
    (task) => <TaskItem key={task.id} task={task} />,
    []
  );

  return (
    <div>
      <h2>Active Tasks: {activeTasks.length}</h2>
      <ul>
        {tasks.map(renderTask)}
      </ul>
    </div>
  );
};

export default TaskList;