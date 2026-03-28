// src/components/dashboard/DashboardLayout.tsx

import { Box, Toolbar } from '@mui/material';

import Sidebar from './Sidebar';

import AppHeader from './AppHeader';

import StatsGrid from './StatsGrid';


export default function DashboardLayout() {

return (

<Box sx={{ display: 'flex', minHeight: '100vh' }}>

<Sidebar />

<Box component='main' sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>

<AppHeader />

<Toolbar />

<StatsGrid />

</Box>

</Box>

);

}