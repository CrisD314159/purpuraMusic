import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps{
  debounce : (value:string) => void
}

export default function SearchInput({debounce}:SearchProps) {
  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'95%', marginTop:'56px', position:'fixed', zIndex:999 }}
    >
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search On Púrpura Music"
        onChange={(e)=> debounce(e.target.value)}
        inputProps={{ 'aria-label': 'Search On Púrpura Music' }}
      />
    </Paper>
  );
}
