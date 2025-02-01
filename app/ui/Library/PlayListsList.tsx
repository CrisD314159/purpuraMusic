'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CircularProgress, List } from '@mui/material';
import useSWR from 'swr';
import { GetUserPlaylists } from '@/app/lib/actions/requests/getRequests';
import Image from 'next/image';
import CreatePlaylistDialog from '../Playlists/CreatePlaylistDialog';


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

  return (
    <Box
      sx={{ width: '100%', height: 400, bgcolor: '#010101', marginTop:3 }}
    >
      <List sx={{overflowX: 'auto', display:'flex', flexDirection:'row', width:'100%', '&::-webkit-scrollbar': { display: 'none' }}}>
        {data?.map((playlist)=>{
          return (
            <ListItem key={playlist.id} style={{width:200, height:200, scrollbarWidth:'none'}}>
              <ListItemButton sx={{display:'flex', width:'100%', height:'100%', flexDirection:'column', alignItems:'center'}}>
                <Image src={playlist.imageUrl} alt='Playlist Image' width={150} height={150} unoptimized/>
                
                <div style={{ width: 190, display: 'flex', justifyContent: 'center' }}>
                  <ListItemText 
                    primary={playlist.name} 
                    sx={{
                      fontFamily: 'Montserrat',
                      textAlign: 'center',
                      whiteSpace: 'wrap',
                    }}
                  />
                </div>
                
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

        <CreatePlaylistDialog props={{mutate}}/>

    </Box>
  );
}
