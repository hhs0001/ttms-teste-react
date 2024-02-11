import React from 'react';
import { Box, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, Drawer as MuiDrawer } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const DrawerComponent = ({ drawerWidth, mobileOpen, handleDrawerToggle, usuario, handleLogout, isMobile }) => {
  const drawerContent = (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={usuario ? usuario.name : "Administrator"} />
        </ListItemButton>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <MuiDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Melhor desempenho de abertura em dispositivos móveis.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          color: 'text.primary',
          boxShadow: 3,
        },
      }}
    >
      {drawerContent}
    </MuiDrawer>
  );
};

export default DrawerComponent;