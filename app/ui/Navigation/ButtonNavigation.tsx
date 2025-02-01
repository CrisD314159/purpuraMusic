'use client'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Link from 'next/link';
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import { useState } from 'react';

export default function ButtonNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: '100%', position:'absolute', bottom:0, margin:'auto', zIndex:1000 }}>
      <BottomNavigation
        showLabels={false}
        sx={{ backgroundColor: 'transparent', marginBottom:'30px' }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          showLabel={false}
          icon={<HomeRoundedIcon />}
          component={Link}
          href="/dashboard/home"
        />
        <BottomNavigationAction
          label="Search"
          showLabel={false}
          icon={<SearchRoundedIcon />}
          component={Link}
          href="/dashboard/search"
        />
        <BottomNavigationAction
          label="Library"
          showLabel={false}
          icon={<TableRowsRoundedIcon />}
          component={Link}
          href="/dashboard/library"
        />
    
      </BottomNavigation>
    </Box>
  );
}