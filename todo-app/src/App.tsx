import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
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
import EditTodoDialog from './components/EditTodoDialog'
import Sidebar from './components/dashboard/Sidebar'
import MovieBrowser from './components/movieBrowser/MovieBrowser'
import { getTheme } from './theme/muiTheme'
import { useTodo } from './context/TodoContext'
import type { FilterType } from './types/todo.types'
import type { Step1Data } from './hooks/validation_zod'
import { Menu as MenuIcon, Search, Plus } from 'lucide-react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const filterOptions: Array<{ value: FilterType; label: string }> = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'active', label: 'Aktywne' },
  { value: 'completed', label: 'Zrobione' },
  { value: 'highPriority', label: 'Wysoki priorytet' },
  { value: 'lowPriority', label: 'Niski priorytet' },
]

function App() {
  const {
    todos,
    filter,
    searchQuery,
    dispatch,
    setFilter,
    setSearchQuery,
    filteredTodos,
    completedCount,
    overdueCount,
  } = useTodo()
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editTodoId, setEditTodoId] = useState<string | null>(null)
  const [editTodoData, setEditTodoData] = useState<{ task: string; timeLimit: string; importance: number } | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [userName, setUserName] = useState('User')
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevPathnameRef = useRef<string | null>(null)

  const theme = useMemo(() => getTheme(isDarkMode ? 'dark' : 'light'), [isDarkMode])
  const menuOpen = Boolean(menuAnchorEl)
  const location = useLocation()
  const navigate = useNavigate()
  const selectedView = location.pathname.startsWith('/movies') ? 'moviebrowser' : location.pathname === '/todo' ? 'todo' : null

  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== location.pathname) {
      setIsTransitioning(true)
      const timer = setTimeout(() => setIsTransitioning(false), 300)
      prevPathnameRef.current = location.pathname
      return () => clearTimeout(timer)
    } else if (prevPathnameRef.current === null) {
      prevPathnameRef.current = location.pathname
    }
  }, [location.pathname])

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

    setEditTodoId(id)
    setEditTodoData({ task: todo.task, timeLimit: todo.timeLimit, importance: todo.importance })
    setShowEditModal(true)
  }

  const handleSaveEdit = (payload: { task: string; timeLimit: string; importance: number }) => {
    if (!editTodoId) return
    dispatch({ type: 'EDIT', payload: { id: editTodoId, ...payload } })
    setEditTodoId(null)
    setEditTodoData(null)
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

  const handleNavigate = (view: 'todo' | 'moviebrowser') => {
    handleMenuClose()
    if (view === 'todo') {
      navigate('/Projekt-To-Do-List/todo')
      return
    }
    navigate('/Projekt-To-Do-List/movies')
  }

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/Projekt-To-Do-List/profile')
      handleMenuClose()
      return
    }

    setShowLoginModal(true)
    setIsRegisterMode(false)
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
    handleMenuClose()
  }

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  const totalTasks = todos.length
  const completedTasks = completedCount
  const overdueTasks = overdueCount

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box component="aside" sx={{ maxWidth: 240, flexShrink: 0 }}>
          <Sidebar onNavigate={handleNavigate} selectedView={selectedView} />
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

            <Fade in={!isTransitioning} timeout={300}>
              <Box>
                <Routes>
              <Route
                path="/"
                element={<Navigate to="/todo" replace />}
              />
              <Route
                path="/todo"
                element={
                  <Box>
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
                  </Box>
                }
              />
              <Route path="/movies" element={<MovieBrowser />} />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <ProfilePage
                        userName={userName}
                        isDarkMode={isDarkMode}
                        onLogout={handleLogout}
                        onToggleTheme={handleToggleTheme}
                        onUpdateName={setUserName}
                        totalTasks={totalTasks}
                        completedTasks={completedTasks}
                        overdueTasks={overdueTasks}
                      />
                  ) : (
                    <Navigate to="/todo" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/todo" replace />} />
                </Routes>
              </Box>
            </Fade>

            <EditTodoDialog
              open={showEditModal && editTodoData !== null}
              onClose={() => {
                setShowEditModal(false)
                setEditTodoId(null)
                setEditTodoData(null)
              }}
              onSave={handleSaveEdit}
              initialData={editTodoData ?? { task: '', timeLimit: '', importance: 5 }}
            />
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
