export type FilterType = 'all' | 'active' | 'completed' | 'highPriority' | 'lowPriority';

export interface Todo {
  id: string;
  task: string;
  timeLimit: string;
  importance: number;
  completed: boolean;
}

export type TodoAction =
  | { type: 'ADD'; payload: Omit<Todo, 'id' | 'completed'> }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; task?: string; timeLimit?: string; importance?: number } }
  | { type: 'SET_FILTER'; payload: FilterType };