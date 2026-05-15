import { useEffect, useMemo, useReducer, useState, type MouseEvent } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TodoItem from './components/TodoItem'
import ProfilePage from './components/ProfilePage'
import LoginModal from './components/LoginModal'
import AddTodoDialog from './components/AddTodoDialog'
import ConfirmDialog from './components/ConfirmDialog'
import Sidebar from './components/dashboard/Sidebar'
import MovieBrowser from './components/movieBrowser/MovieBrowser'
import { todoReducer } from './reducers/todoReducer'
import { getTheme } from './theme/muiTheme'
import type { FilterType } from './types/todo.types'
import type { Step1Data } from './hooks/validation_zod'
import { Menu as MenuIcon, Search, Plus } from 'lucide-react'

const filterOptions: Array<{ value: FilterType; label: string }> = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'active', label: 'Aktywne' },
  { value: 'completed', label: 'Zrobione' },
  { value: 'highPriority', label: 'Wysoki priorytet' },
  { value: 'lowPriority', label: 'Niski priorytet' },
]

const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: generateUUID(), task: 'Task A', timeLimit: '2026-03-28 09:00', importance: 5, completed: false },
    { id: generateUUID(), task: 'Task B', timeLimit: 'Brak', importance: 3, completed: true },
  ])
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userName, setUserName] = useState('User')
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [currentView, setCurrentView] = useState<'todo' | 'moviebrowser'>('todo')

  const theme = useMemo(() => getTheme(isDarkMode ? 'dark' : 'light'), [isDarkMode])
  const menuOpen = Boolean(menuAnchorEl)

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element
      if (menuOpen && !target.closest('.menu-anchor')) {
        handleMenuClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: id })
  }

  const handleEdit = (id: string) => {
    const todo = todos.find((t) => t.id === id)
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

  const handleAddTodo = (payload: { task: string; timeLimit: string; importance: number }) => {
    dispatch({ type: 'ADD', payload })
  }

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowProfile(true)
      handleMenuClose()
      return
    }

    setShowLoginModal(true)
    setIsRegisterMode(false)
    handleMenuClose()
  }

  const handleHomeClick = () => {
    setShowProfile(false)
    setCurrentView('todo')
    handleMenuClose()
  }

  const handleLoginSubmit = (data: Step1Data) => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
    setIsRegisterMode(false)
    setUserName(data.login)
  }

  const handleSwitchMode = () => {
    setIsRegisterMode((prev) => !prev)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowProfile(false)
    handleMenuClose()
  }

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

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

  const totalTasks = todos.length
  const completedTasks = todos.filter((t) => t.completed).length
  const overdueTasks = todos.filter((t) => {
    if (t.timeLimit === 'Brak' || t.completed) return false
    const dueDate = new Date(t.timeLimit)
    return dueDate < new Date()
  }).length

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box component="aside" sx={{ maxWidth: 240, flexShrink: 0 }}>
          <Sidebar onNavigate={setCurrentView} />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 2, bgcolor: 'background.default', overflow: 'auto', minWidth: 0, }}>
          <Box sx={{ mx: 'auto', width: '100%' ,maxWidth: 1200, }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <IconButton
                onClick={handleMenuOpen}
                className="menu-anchor"
                sx={{ border: '1px solid', borderColor: 'divider', color: 'text.primary' }}
              >
                <MenuIcon size={20} />
              </IconButton>
            </Box>

            {!showProfile && currentView === 'todo' && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                    TO DO LIST
                  </Typography>
                </Box>

                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, md: 3 },
                    mb: 4,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    mx: 'auto',
                  }}
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <TextField
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Wyszukaj zadanie..."
                      fullWidth
                      size="medium"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search size={18} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ backgroundColor: 'background.paper' }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Plus size={16} />}
                      onClick={() => setShowAddModal(true)}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Dodaj zadanie
                    </Button>
                  </Stack>

                  <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={(_, value) => {
                      if (value) setFilter(value)
                    }}
                    aria-label="Filtry zadań"
                    sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}
                  >
                    {filterOptions.map((option) => (
                      <ToggleButton key={option.value} value={option.value} aria-label={option.label}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Paper>

                <Grid container spacing={3}>
                  {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                      <Grid item xs={12} sm={6} md={4} key={todo.id}>
                        <TodoItem
                          task={todo.task}
                          timeLimit={todo.timeLimit}
                          importance={todo.importance}
                          completed={todo.completed}
                          onToggle={() => handleToggle(todo.id)}
                          onEdit={() => handleEdit(todo.id)}
                          onDelete={() => handleDeleteClick(todo.id)}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{ p: 4, textAlign: 'center', backgroundColor: 'background.paper', borderRadius: 3 }}
                      >
                        <Typography variant="h6">Brak pasujących zadań</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                          Spróbuj zmienić filtry lub dodaj nowe zadanie.
                        </Typography>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </>
            )}

            {showProfile && (
              <ProfilePage
                userName={userName}
                isDarkMode={isDarkMode}
                onBack={handleHomeClick}
                onLogout={handleLogout}
                onToggleTheme={handleToggleTheme}
                onUpdateName={setUserName}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
                overdueTasks={overdueTasks}
              />
            )}

            {currentView === 'moviebrowser' && <MovieBrowser />}

            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{ sx: { backgroundColor: 'background.paper' } }}
            >
              <MenuItem onClick={handleProfileClick}>{isLoggedIn ? '👤 Profil' : '🔐 Logowanie'}</MenuItem>
              {isLoggedIn && <MenuItem onClick={handleLogout}>🚪 Wyloguj</MenuItem>}
              <MenuItem
                onClick={() => {
                  handleToggleTheme()
                  handleMenuClose()
                }}
              >
                {isDarkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny'}
              </MenuItem>
            </Menu>

            <AddTodoDialog open={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddTodo} />
            <ConfirmDialog
              open={showConfirm}
              title="Usuń zadanie"
              message="Czy na pewno chcesz usunąć to zadanie?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
            <LoginModal
              open={showLoginModal}
              isRegisterMode={isRegisterMode}
              onClose={() => setShowLoginModal(false)}
              onSubmit={handleLoginSubmit}
              onSwitchMode={handleSwitchMode}
            />
          </Box>{/* koniec centrowanego kontenera */}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
