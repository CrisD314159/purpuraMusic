'use client'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from 'next/link';
import LogoutDialog from '../Dialog/LogoutDialog';
import { useAuthStore } from '@/store/useAuthStore'; 
import InfoIcon from '@mui/icons-material/Info';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function MenuDrawer({showHome}:{showHome:boolean}) {
  const [open, setOpen] = useState(false);
  const {isAuthenticated} = useAuthStore()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 220, background:'#121212', height:'100%'}} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        {showHome &&
          <ListItem>
          <ListItemButton LinkComponent={Link} href="/">
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        }
        {
          isAuthenticated &&
          <ListItem>
            <ListItemButton LinkComponent={Link} href='/user/account'>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Account Overview"} />
            </ListItemButton>
          </ListItem>
        }

          <ListItem>
            <ListItemButton LinkComponent={Link} href='/info/purpuramusic'>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"App Info"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
        {

          isAuthenticated ?
          <ListItem sx={{backgroundColor: '#ad0707', width:'90%', borderRadius: '10px', margin:'auto'}}>
            <LogoutDialog />
          </ListItem>
          :
          <ListItem sx={{backgroundColor: '#9607f5', width:'90%', borderRadius: '10px', margin:'auto'}}>
          <ListItemButton LinkComponent={Link} href='/'>
            <ListItemText primary={"Log in"} />
          </ListItemButton>
        </ListItem>

        }
       
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} color='primary'>
        <MenuRoundedIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
