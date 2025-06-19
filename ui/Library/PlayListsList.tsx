'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress, List } from '@mui/material';
import useSWR from 'swr';
import CreatePlaylistDialog from '../Playlists/CreatePlaylistDialog';
import PlayListDialogComponent from '../Playlists/PlayListDialog/PlayListDialogComponent';
import { GetUserPlaylists } from '@/lib/serverActions/GetActions';


interface Playlist {
  id:string,
  name:string,
  description:string,
  userId:string,
  userName:string,
  isPublic:boolean,
  imageUrl:string,
}

export default function PlayListsList() {
  const {data, error, isLoading, mutate} = useSWR<Playlist[]>('playlists', GetUserPlaylists)

  if(isLoading) return <CircularProgress/>

  if(error) return <div>Error</div>

  if(data?.length === 0) return <div>
    <CreatePlaylistDialog mutate={mutate}/>
    <p className='mt-6'>  No playlists</p>
    </div>

  return (
    <Box
      sx={{ width: '100%', height: 400, bgcolor: '#010101', marginTop:3 }}
    >
      <CreatePlaylistDialog mutate={mutate}/>
      <List sx={{overflowX: 'auto', display:'flex', flexDirection:'row', width:'100%', '&::-webkit-scrollbar': { display: 'none' }}}>
        {data &&
        data?.map((playlist)=>{
          return (
            <PlayListDialogComponent mutate={mutate} key={playlist.id} playlist={playlist}/> 
          )
        })}
      </List>
    </Box>
  );
}
