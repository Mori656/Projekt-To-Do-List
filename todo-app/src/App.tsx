import './App.css'
import { useState, useReducer, useEffect } from 'react'
import TodoItem from './components/TodoItem'
import { todoReducer } from './reducers/todoReducer'
import type { FilterType } from './types/todo.types'
import { step1Schema} from './hooks/validation_zod'

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

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: generateUUID(), task: 'Task A', timeLimit: '2026-03-28 09:00', importance: 5, completed: false },
    { id: generateUUID(), task: 'Task B', timeLimit: 'Brak', importance: 3, completed: true }
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
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Zamknij hamburger menu przy kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isHamburgerOpen && !target.closest('.hamburger-button') && !target.closest('.hamburger-menu')) {
        setIsHamburgerOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isHamburgerOpen])

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
    setIsHamburgerOpen(false) // Zamknij hamburger po kliknięciu
  }

  const handleHomeClick = () => {
    setShowProfile(false) // Powrót do głównej strony
    setIsHamburgerOpen(false) // Zamknij hamburger po kliknięciu
  }

  const toggleHamburger = () => {
    console.log("klik działa");
    setIsHamburgerOpen(!isHamburgerOpen)
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
    const result = step1Schema.safeParse({
      login: login, 
      password: password,
      confirmPassword: confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      const formatted = result.error.format();

      if (formatted.login?._errors[0]) {
        fieldErrors.login = formatted.login._errors[0];
      }
      if (formatted.password?._errors[0]) {
        fieldErrors.password = formatted.password._errors[0];
      }
      if (formatted.confirmPassword?._errors[0]) {
        fieldErrors.confirmPassword = formatted.confirmPassword._errors[0];
      }

      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Dane poprawne
    setIsLoggedIn(true)
    setShowLoginModal(false)
    setIsRegisterMode(false)
    setLogin('')
    setPassword('')
    setConfirmPassword('')

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
          <div className="app-header">
            <div className="app-header__logo">Logo</div>
            <h1 className="app-header__title" style={{ margin: 0 }}>Profil</h1>
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
          <div className="profile-grid">
            {/* Left: Avatar and Name */}
            <div className="profile-section">
              <div className="profile-avatar">
                👤
              </div>
              <h2 className="profile-heading">{userName}</h2>
              <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
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
                  Ustaw nazwę
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
                  Wyloguj
                </button>
              </div>
            </div>

            {/* Center: Statistics */}
            <div className="stats-container">
              <h3 style={{ margin: '0 0 16px 0' }}>Statystyka</h3>
              <div style={{ textAlign: 'center' }}>
                <p className="stats-item">Zaplanowane zadania: {totalTasks}</p>
                <p className="stats-item">Wykonane zadania: {completedTasks}</p>
                <p className="stats-item">Zadania przeterminowane: {overdueTasks}</p>
              </div>
            </div>

            {/* Right: Theme Toggle */}
            <div className="theme-container">
              <h3 style={{ margin: '0 0 16px 0' }}>Motyw</h3>
              <button
                onClick={handleToggleTheme}
                className="theme-button"
                title={isDarkMode ? 'Przełącz na jasny tryb' : 'Przełącz na ciemny tryb'}
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              <p>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
          </div>

          {showSetNameModal && (
            <div className="app-modal">
              <div className="app-modal__content">
                <h2 className="app-modal__title">
                  Zmień nazwę użytkownika
                </h2>
                <div className="app-form-wrapper">
                  <input
                    type="text"
                    placeholder="Nowa nazwa"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="app-form-input"
                  />
                  <div className="app-button-group">
                    <button
                      onClick={handleConfirmSetName}
                      className="app-button-primary"
                    >
                      OK
                    </button>
                    <button
                      onClick={handleCancelSetName}
                      className="app-button-secondary"
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
      <div className="app-header">
        <div className="app-header__logo">Logo</div>
        <h1 className="app-header__title" style={{ margin: 0 }}>To do list</h1>
        <button
          onClick={toggleHamburger}
          className="hamburger-button"
          title="Menu"
        >
          <span className={`hamburger-line ${isHamburgerOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isHamburgerOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isHamburgerOpen ? 'open' : ''}`}></span>
        </button>
        {isHamburgerOpen && (
          <div className="hamburger-menu">
            <button
              onClick={handleHomeClick}
              className="hamburger-menu-item"
            >
              🏠 Główna strona
            </button>
            <button
              onClick={handleProfileClick}
              className="hamburger-menu-item"
            >
              {isLoggedIn ? '👤 Profil' : '🔐 Logowanie'}
            </button>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="hamburger-menu-item"
              >
                🚪 Wyloguj
              </button>
            )}
            <button
              onClick={handleToggleTheme}
              className="hamburger-menu-item"
            >
              {isDarkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny'}
            </button>
          </div>
        )}
      </div>

      <div style={{ padding: '0' }}>
        <div className="app-toolbar">
          <button
            onClick={() => setShowFilterModal(true)}
            className="app-button-secondary"
          >
            Filtry
          </button>
          <input
            type="text"
            placeholder="Szukaj zadań..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="app-toolbar__input"
          />
          <button
            onClick={() => setShowAddModal(true)}
            className="app-button-primary"
          >
            +
          </button>
        </div>
      </div>

      <div className="app-grid-container">
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

{/* Charty nie do tego projektu ale dla testu">}
      {/* <div className="charts-panel-container">
        <ChartsPanel>
          <NoiseChart data={testData as SensorData[]} />
        </ChartsPanel>
      </div> */}

      {showAddModal && (
        <div className="app-modal">
          <div className="app-modal__content">
            <h3 className="app-modal__title">Dodaj nowe zadanie</h3>
            <div className="app-form-wrapper">
              <div className="app-form-group">
                <label className="app-form-label">Zadanie</label>
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="app-form-input"
                />
              </div>
              <div className="app-form-group">
                <label className="app-form-label">Termin</label>
                <input
                  value={newTimeLimit}
                  onChange={(e) => setNewTimeLimit(e.target.value)}
                  placeholder='np. 2026-03-28 14:00'
                  className="app-form-input"
                />
              </div>
              <div className="app-form-group">
                <label className="app-form-label">Importance 1-9</label>
                <input
                  value={newImportance}
                  onChange={(e) => setNewImportance(e.target.value)}
                  type='number'
                  min={1}
                  max={9}
                  className="app-form-input"
                />
              </div>
              <div className="app-button-group">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="app-button-secondary"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleAddTodo}
                  className="app-button-primary"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFilterModal && (
        <div className="app-modal">
          <div className="app-modal__content">
            <h3 className="app-modal__title">Filtry</h3>
            <div className="app-form-wrapper">
              <label style={{ display: 'block', fontWeight: '500', fontSize: '14px' }}>Status zadań:</label>
              <div className="app-checkbox-group">
                <label className="app-checkbox-item">
                  <input
                    type="radio"
                    name="filter"
                    value="all"
                    checked={filter === 'all'}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                  />
                  Wszystkie
                </label>
                <label className="app-checkbox-item">
                  <input
                    type="radio"
                    name="filter"
                    value="active"
                    checked={filter === 'active'}
                    onChange={(e) => setFilter(e.target.value as FilterType)}
                  />
                  Aktywne
                </label>
                <label className="app-checkbox-item">
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
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="app-button-secondary"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="app-modal">
          <div className="app-modal__content">
            <p style={{ marginTop: '0', fontSize: '14px', textAlign: 'center' }}>Czy na pewno chcesz usunąć to zadanie?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
              <button
                onClick={confirmDelete}
                className="app-button-secondary"
              >
                Usuń
              </button>
              <button
                onClick={cancelDelete}
                className="app-button-primary"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="app-modal">
          <div className="app-modal__content">
            <h2 className="app-modal__title">
              {isRegisterMode ? 'Rejestracja' : 'Logowanie'}
            </h2>
            <div className="app-form-wrapper">
              <div>
                <input
                  type="text"
                  placeholder="Login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="app-form-input"
                />
                {errors.login && <p className="error">{errors.login}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="app-form-input"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              {isRegisterMode && (
                <div><input
                  type="password"
                  placeholder="Powtórz hasło"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="app-form-input"
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
              )}
              
              <div className="app-button-group">
                <button
                  onClick={isRegisterMode ? handleRegister : handleLogin}
                  className="app-button-primary"
                >
                  {isRegisterMode ? 'Zarejestruj' : 'Zaloguj'}
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="app-button-secondary"
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
                    textDecoration: 'underline',
                    fontSize: '13px'
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
                    textDecoration: 'underline',
                    fontSize: '13px'
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
