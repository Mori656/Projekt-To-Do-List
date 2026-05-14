import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import { CheckSquare2, Film } from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: 'todo' | 'moviebrowser') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <Drawer
    variant="permanent"
    sx={{
      width: {
        xs: 72,
        sm: 130,
        md: 180,
        lg: 220,
      },
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: {
          xs: 72,
          sm: 130,
          md: 180,
          lg: 220,
        },
        boxSizing: 'border-box',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
    },
  }}
>
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" 
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            }, 
            fontWeight: 700, 
            color: 'text.secondary', 
            textTransform: 'uppercase', 
            fontSize: '0.75rem', 
            letterSpacing: '0.1em' }}>
          Nawigacja
        </Typography>
      </Box>
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onNavigate('todo')}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                color: 'primary.main',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <CheckSquare2 size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Todo List"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onNavigate('moviebrowser')}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                color: 'primary.main',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <Film size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Movie Browser"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
    </Drawer>
  );
};

export default Sidebar;