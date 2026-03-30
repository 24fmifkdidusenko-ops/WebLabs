import { Task, Bug } from './types';

export function filterTasks(tasks: Task[], query: string): Task[] {
  return tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase()));
}

export function isHighPriorityBug(task: Task): task is Bug {
  return task.type === 'bug' && task.severity === 'critical';
}