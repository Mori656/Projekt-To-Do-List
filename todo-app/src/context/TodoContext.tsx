// src/context/TodoContext.tsx

import { createContext, useContext, useMemo, useReducer, useState, type ReactNode, type Dispatch } from 'react'
import { todoReducer } from '../reducers/todoReducer'
import type { Todo, TodoAction, FilterType } from '../types/todo.types'

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

interface TodoContextType {
  todos: Todo[]
  filter: FilterType
  searchQuery: string
  dispatch: Dispatch<TodoAction>
  setFilter: (filter: FilterType) => void
  setSearchQuery: (searchQuery: string) => void
  activeCount: number
  completedCount: number
  overdueCount: number
  filteredTodos: Todo[]
}

// TODO (5a): utwórz TodoContext za pomocą createContext

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: generateUUID(), task: 'Task A', timeLimit: '2026-03-28 09:00', importance: 5, completed: false },
    { id: generateUUID(), task: 'Task B', timeLimit: 'Brak', importance: 3, completed: true },
  ])
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        const matchesFilter =
          filter === 'all' ||
          (filter === 'active' && !todo.completed) ||
          (filter === 'completed' && todo.completed) ||
          (filter === 'highPriority' && todo.importance >= 7) ||
          (filter === 'lowPriority' && todo.importance <= 3)
        const matchesSearch = todo.task.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
      }),
    [todos, filter, searchQuery],
  )

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos])
  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos])
  const overdueCount = useMemo(
    () =>
      todos.filter((t) => {
        if (t.timeLimit === 'Brak' || t.completed) return false
        const dueDate = new Date(t.timeLimit)
        return dueDate < new Date()
      }).length,
    [todos],
  )

  // TODO (5b): opakuj children w TodoContext.Provider przekazując { todos, filter, dispatch, setFilter, activeCount, filteredTodos }

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        searchQuery,
        dispatch,
        setFilter,
        setSearchQuery,
        activeCount,
        completedCount,
        overdueCount,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

// Custom hook do konsumpcji kontekstu

export function useTodo() {
  // TODO (5c): zwróć wynik useContext(TodoContext)
  // Wskazówka: sprawdź czy kontekst nie jest undefined

  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}