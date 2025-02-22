'use client'
import { GetPlaylistSongs } from '@/app/lib/actions/serverActions/getActions'
import { CircularProgress, IconButton } from '@mui/material'
import useSWR from 'swr'
import PlaylistSongList from './PlaylistSongList'
import { useEffect } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';


const fetcher = async ([, id]: [string, string])=>{
  const response = await GetPlaylistSongs(id)
  return response
}

interface PlaylistContainerProps{
  id:string
  color:string
  open:boolean
}

export default function PlaylistSongsContainer({id, color, open}:PlaylistContainerProps) {
  const {data, error, isLoading, mutate} = useSWR(['songs', id], fetcher)

    useEffect(() => {
      if (open) {
        mutate(undefined, true); // Se asegura de obtener los datos más recientes
      }
    }, [open, mutate]);

    const handleMutate = () =>{
      mutate(undefined, true)
    }

  if(isLoading) return <CircularProgress color='primary' sx={{mt:5}}/>
  if(error) return <p>An errror ocurred while fetching your songs</p>

  return (
  <>
   <IconButton onClick={() => mutate(undefined, true)} disabled={isLoading} sx={{ position:'absolute', top:240, right:'5%'}}>
      <RefreshIcon />
   </IconButton>
    <PlaylistSongList mutate={handleMutate} removePlaylist={true} playlistId={id} initialSongs={data.songs} color={color} />
  </>)
}