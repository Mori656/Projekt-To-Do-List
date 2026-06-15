// src/components/dashboard/DashboardLayout.tsx

import { Box, Toolbar } from '@mui/material';

import Sidebar from './Sidebar';

import AppHeader from './AppHeader';

import StatsGrid from './StatsGrid';

import type { Todo } from '../../types/todo.types';

interface DashboardLayoutProps {
  onNavigate: (view: 'todo' | 'moviebrowser') => void;
  todos: Todo[];
  selectedView: 'todo' | 'moviebrowser' | null;
}

export default function DashboardLayout({ onNavigate, todos, selectedView }: DashboardLayoutProps) {

return (

<Box sx={{ display: 'flex', minHeight: '100vh' }}>

<Sidebar onNavigate={onNavigate} selectedView={selectedView} />

<Box component='main' sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>

<AppHeader />

<Toolbar />

<StatsGrid todos={todos} />

</Box>

</Box>

);

}