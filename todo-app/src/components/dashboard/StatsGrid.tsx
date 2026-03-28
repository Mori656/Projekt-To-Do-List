// src/components/dashboard/StatsGrid.tsx

import { Box } from '@mui/material';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import StatsCard from './StatsCard';

import { useTodo } from '../../context/TodoContext';


export default function StatsGrid() {

const { todos } = useTodo();


// TODO 2: Oblicz wartości na podstawie todos

const total = todos.length;

const completed = todos.filter(t => t.completed).length;

const pending = todos.filter(t => !t.completed).length;


return (

<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>

<Box sx={{ flex: '1 1 300px' }}>

<StatsCard

title='Wszystkie zadania'

value={total}

icon={FormatListBulletedIcon}

color='#1565C0'

bgColor='#E3F2FD'

/>

</Box>

<Box sx={{ flex: '1 1 300px' }}>

<StatsCard

title='Ukończone'

value={completed}

icon={FormatListBulletedIcon}

color='#2E7D32'

bgColor='#E8F5E8'

/>

</Box>

<Box sx={{ flex: '1 1 300px' }}>

<StatsCard

title='Oczekujące'

value={pending}

icon={FormatListBulletedIcon}

color='#F57C00'

bgColor='#FFF3E0'

/>

</Box>

</Box>

);

}