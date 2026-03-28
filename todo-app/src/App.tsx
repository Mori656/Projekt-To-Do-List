import './App.css'
import { useState, useReducer } from 'react'
import TodoItem from './components/TodoItem'
import { todoReducer } from './reducers/todoReducer'
import type { FilterType } from './types/todo.types'

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: crypto.randomUUID(), task: 'Task A', timeLimit: '2026-03-28 09:00', importance: 5, completed: false },
    { id: crypto.randomUUID(), task: 'Task B', timeLimit: 'Brak', importance: 3, completed: true }
  ])
  const [filter, setFilter] = useState<FilterType>('all')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [newTimeLimit, setNewTimeLimit] = useState('')
  const [newImportance, setNewImportance] = useState('5')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userName, setUserName] = useState('User')
  const [showSetNameModal, setShowSetNameModal] = useState(false)
  const [newUserName, setNewUserName] = useState('')

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: id })
  }

  const handleEdit = (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const updatedTask = prompt('Edytuj tytuł zadania', todo.task)?.trim()
    if (!updatedTask) return

    const updatedTime = prompt('Edytuj termin', todo.timeLimit)?.trim() || todo.timeLimit
    const updatedImportanceInput = prompt('Edytuj importance (1-9)', String(todo.importance))
    const updatedImportance = Number(updatedImportanceInput)
    if (isNaN(updatedImportance) || updatedImportance < 1 || updatedImportance > 9) {
      alert('Importance musi być liczbą 1-9')
      return
    }

    dispatch({ type: 'EDIT', payload: { id, task: updatedTask, timeLimit: updatedTime, importance: updatedImportance } })
  }

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch({ type: 'DELETE', payload: deleteId })
    }
    setShowConfirm(false)
    setDeleteId(null)
  }

  const cancelDelete = () => {
    setShowConfirm(false)
    setDeleteId(null)
  }

  const handleAddTodo = () => {
    const trimmedTask = newTask.trim()
    if (!trimmedTask) return

    const importanceValue = Number(newImportance)
    if (isNaN(importanceValue) || importanceValue < 1 || importanceValue > 9) {
      alert('Importance musi być liczba 1-9')
      return
    }

    dispatch({ type: 'ADD', payload: { task: trimmedTask, timeLimit: newTimeLimit.trim() || 'Brak', importance: importanceValue } })
    setNewTask('')
    setNewTimeLimit('')
    setNewImportance('5')
    setShowAddModal(false)
  }

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowProfile(true)
    } else {
      setShowLoginModal(true)
      setIsRegisterMode(false)
    }
  }

  const handleHomeClick = () => {
    alert('Powrót do głównej strony')
  }

  const handleLogin = () => {
    if (login.trim() && password.trim()) {
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setLogin('')
      setPassword('')
      setConfirmPassword('')
    } else {
      alert('Wypełnij wszystkie pola')
    }
  }

  const handleRegister = () => {
    if (login.trim() && password.trim() && confirmPassword.trim() && password === confirmPassword) {
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setIsRegisterMode(false)
      setLogin('')
      setPassword('')
      setConfirmPassword('')
    } else {
      alert('Wypełnij wszystkie pola i upewnij się, że hasła są identyczne')
    }
  }

  const handleSwitchToRegister = () => {
    setIsRegisterMode(true)
  }

  const handleSwitchToLogin = () => {
    setIsRegisterMode(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowProfile(false)
  }

  const handleSetName = () => {
    setNewUserName(userName)
    setShowSetNameModal(true)
  }

  const handleConfirmSetName = () => {
    if (newUserName.trim()) {
      setUserName(newUserName.trim())
    }
    setShowSetNameModal(false)
  }

  const handleCancelSetName = () => {
    setShowSetNameModal(false)
  }

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const totalTasks = todos.length
  const completedTasks = todos.filter(t => t.completed).length
  const overdueTasks = todos.filter(t => {
    if (t.timeLimit === 'Brak' || t.completed) return false
    const dueDate = new Date(t.timeLimit)
    return dueDate < new Date()
  }).length

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed)
    const matchesSearch = todo.task.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (showProfile) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        {/* Profile Page */}
        <div>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid #a0927d'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Logo</div>
            <h1 style={{ margin: 0, fontSize: '32px' }}>Profile</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowProfile(false)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #a0927d',
                  background: '#f5f1e8',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
                title="Home"
              >
                🏠
              </button>
              <button
                onClick={handleProfileClick}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #a0927d',
                  background: '#f5f1e8',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
                title="Profile"
              >
                👤
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '24px',
            padding: '24px',
            minHeight: 'calc(100vh - 80px)'
          }}>
            {/* Left: Avatar and Name */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '120px',
                marginBottom: '16px'
              }}>
                👤
              </div>
              <h2 style={{ margin: '0 0 16px 0' }}>{userName}</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleSetName}
                  style={{
                    padding: '8px 16px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Set Name
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '8px 16px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Center: Statistics */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Statistics</h3>
              <div style={{ textAlign: 'center' }}>
                <p>Task Planned: {totalTasks}</p>
                <p>Task Done: {completedTasks}</p>
                <p>Task Overdue: {overdueTasks}</p>
              </div>
            </div>

            {/* Right: Theme Toggle */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Theme</h3>
              <button
                onClick={handleToggleTheme}
                style={{
                  fontSize: '48px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              <p>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
          </div>

          {showSetNameModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                background: '#f5f1e8',
                padding: '24px',
                borderRadius: '12px',
                width: '300px',
                maxWidth: '90%'
              }}>
                <h2 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>
                  Zmień nazwę użytkownika
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Nowa nazwa"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    style={{
                      padding: '8px',
                      border: '1px solid #a0927d',
                      borderRadius: '4px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      onClick={handleConfirmSetName}
                      style={{
                        flex: 1,
                        padding: '8px',
                        background: '#7a8f6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      OK
                    </button>
                    <button
                      onClick={handleCancelSetName}
                      style={{
                        flex: 1,
                        padding: '8px',
                        background: '#8b7355',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Anuluj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #a0927d'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Logo</div>
        <h1 style={{ margin: 0, fontSize: '32px' }}>To do list</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleHomeClick}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #a0927d',
              background: '#f5f1e8',
              cursor: 'pointer',
              fontSize: '18px'
            }}
            title="Home"
          >
            🏠
          </button>
          <button
            onClick={handleProfileClick}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #a0927d',
              background: '#f5f1e8',
              cursor: 'pointer',
              fontSize: '18px',
              position: 'relative'
            }}
            title={isLoggedIn ? 'Profile' : 'Login'}
          >
            👤
            {!isLoggedIn && (
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                fontSize: '20px',
                color: '#8b7355'
              }}>
                ✕
              </span>
            )}
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={() => setShowFilterModal(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #a0927d',
              background: '#f5f1e8',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Filtry
          </button>
          <input
            type="text"
            placeholder="Szukaj zadań..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #a0927d',
              width: '300px',
              fontSize: '16px',
              background: '#f5f1e8'
            }}
          />
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: '#7a8f6b',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            +
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            task={todo.task}
            timeLimit={todo.timeLimit}
            importance={todo.importance}
            completed={todo.completed}
            onToggle={() => handleToggle(todo.id)}
            onEdit={() => handleEdit(todo.id)}
            onDelete={() => handleDeleteClick(todo.id)}
          />
        ))}
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '320px',
            background: '#f5f1e8',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginTop: 0 }}>Dodaj nowe zadanie</h3>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>Zadanie</label>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>Termin</label>
              <input
                value={newTimeLimit}
                onChange={(e) => setNewTimeLimit(e.target.value)}
                placeholder='np. 2026-03-28 14:00'
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>Importance 1-9</label>
              <input
                value={newImportance}
                onChange={(e) => setNewImportance(e.target.value)}
                type='number'
                min={1}
                max={9}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ padding: '8px 14px', border: '1px solid #a0927d', borderRadius: '6px', background: '#8b7355', color: 'white', cursor: 'pointer' }}
              >
                Anuluj
              </button>
              <button
                onClick={handleAddTodo}
                style={{ padding: '8px 14px', border: 'none', borderRadius: '6px', background: '#7a8f6b', color: 'white', cursor: 'pointer' }}
              >
                Dodaj
              </button>
            </div>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '320px',
            background: '#f5f1e8',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ marginTop: 0 }}>Filtry</h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Status zadań:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="filter"
                    value="all"
                    checked={filter === 'all'}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                  />
                  Wszystkie
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="filter"
                    value="active"
                    checked={filter === 'active'}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                  />
                  Aktywne
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="filter"
                    value="completed"
                    checked={filter === 'completed'}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                  />
                  Zrobione
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setShowFilterModal(false)}
                style={{ padding: '8px 14px', border: '1px solid #a0927d', borderRadius: '6px', background: '#8b7355', color: 'white', cursor: 'pointer' }}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#f5f1e8',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <p style={{ marginTop: '0', fontSize: '16px' }}>Czy na pewno chcesz usunąć to zadanie?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={confirmDelete}
                style={{
                  padding: '8px 16px',
                  background: '#8b7355',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Usuń
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  padding: '8px 16px',
                  background: '#7a8f6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#f5f1e8',
            padding: '24px',
            borderRadius: '12px',
            width: '300px',
            maxWidth: '90%'
          }}>
            <h2 style={{ margin: '0 0 16px 0', textAlign: 'center' }}>
              {isRegisterMode ? 'Rejestracja' : 'Logowanie'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{
                  padding: '8px',
                  border: '1px solid #a0927d',
                  borderRadius: '4px'
                }}
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  padding: '8px',
                  border: '1px solid #a0927d',
                  borderRadius: '4px'
                }}
              />
              {isRegisterMode && (
                <input
                  type="password"
                  placeholder="Powtórz hasło"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    padding: '8px',
                    border: '1px solid #a0927d',
                    borderRadius: '4px'
                  }}
                />
              )}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={isRegisterMode ? handleRegister : handleLogin}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#7a8f6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {isRegisterMode ? 'Zarejestruj' : 'Zaloguj'}
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#8b7355',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Anuluj
                </button>
              </div>
              {!isRegisterMode && (
                <button
                  onClick={handleSwitchToRegister}
                  style={{
                    padding: '8px',
                    background: 'none',
                    color: '#3b82f6',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Nie masz konta? Zarejestruj się
                </button>
              )}
              {isRegisterMode && (
                <button
                  onClick={handleSwitchToLogin}
                  style={{
                    padding: '8px',
                    background: 'none',
                    color: '#3b82f6',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Masz konto? Zaloguj się
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
