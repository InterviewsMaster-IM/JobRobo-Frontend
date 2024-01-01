import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';

const DesktopSidebar = () => {
  return (
    <Drawer variant="permanent" >
      <List>
        <ListItem>
          <NavLink to={'/home'}>Home</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={'/pastjobrobos'}>Past Job Robos</NavLink>
        </ListItem>
        <ListItem>
          <NavLink to={'/profile'}>JobRobo Profile</NavLink>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default DesktopSidebar;