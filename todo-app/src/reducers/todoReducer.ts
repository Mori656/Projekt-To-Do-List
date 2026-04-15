// src/reducers/todoReducer.ts

import type { Todo, TodoAction } from '../types/todo.types';

// Polyfill for crypto.randomUUID() for mobile browsers
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for browsers that don't support crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {

switch (action.type) {


case 'ADD':

// TODO (4a): zwróć nową tablicę z nowym Todo na początku

return [{ id: generateUUID(), ...action.payload, completed: false }, ...state];


case 'TOGGLE':

// TODO (4b): zmień pole completed dla Todo o id === action.payload

return state.map(todo =>

  todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo

);


case 'DELETE':

// TODO (4c): odfiltruj Todo o id === action.payload

return state.filter(todo => todo.id !== action.payload);


case 'EDIT':

return state.map(t =>

t.id === action.payload.id ? { ...t, ...action.payload } : t

);


default:

return state;

}

}