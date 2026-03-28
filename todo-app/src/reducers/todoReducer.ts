// src/reducers/todoReducer.ts

import type { Todo, TodoAction } from '../types/todo.types';


export function todoReducer(state: Todo[], action: TodoAction): Todo[] {

switch (action.type) {


case 'ADD':

// TODO (4a): zwróć nową tablicę z nowym Todo na początku

return [{ id: crypto.randomUUID(), ...action.payload, completed: false }, ...state];


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