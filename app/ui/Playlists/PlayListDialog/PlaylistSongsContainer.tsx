'use client'
import { GetPlaylistSongs } from '@/app/lib/actions/serverActions/getActions'
import { CircularProgress } from '@mui/material'
import useSWR from 'swr'
import PlaylistSongList from './PlaylistSongList'


const fetcher = async ([, id]: [string, string])=>{
  const response = await GetPlaylistSongs(id)
  return response
}

interface PlaylistContainerProps{
  id:string
  color:string
}



export default function PlaylistSongsContainer({id, color}:PlaylistContainerProps) {
  const {data, error, isLoading} = useSWR(['favorites', id], fetcher)

  if(isLoading) return <CircularProgress color='primary'/>
  if(error) return <p>An errror ocurred while fetching your songs</p>

  return (
  <>
    <PlaylistSongList initialSongs={data.songs} color={color} />
  </>)
}