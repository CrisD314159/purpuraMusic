'use client'
import FavoritesList from './FavoritesList'
import { GetUserFavorites } from '@/app/lib/actions/serverActions/getActions'
import { CircularProgress } from '@mui/material'
import useSWR from 'swr'

const INITIAL_NUMBER_OF_USERS = 20

const fetcher = async ()=>{
  const response = await GetUserFavorites(0, INITIAL_NUMBER_OF_USERS)
  return response
}

export default function FavoritesContainer() {
  const {data, error, isLoading} = useSWR('favorites', fetcher)

  if(isLoading) return <CircularProgress color='primary'/>
  if(error) return <p>An errror ocurred while fetching your songs</p>

  return (
  <>
    <FavoritesList initialSongs={data.songs} />
  </>)
}