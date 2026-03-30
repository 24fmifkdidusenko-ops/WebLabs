export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Bug = {
  type: 'bug';
  id: number;
  title: string;
  status: TaskStatus;
  severity: 'low' | 'high' | 'critical';
};

export type Feature = {
  type: 'feature';
  id: number;
  title: string;
  status: TaskStatus;
  priority: number;
  expectedRelease?: string;
};

export type Task = Bug | Feature;

export function isHighPriorityBug(task: Task): task is Bug {
  return task.type === 'bug' && task.severity === 'critical';
}