'use client'
import { GetUserFavorites } from '@/app/lib/actions/serverActions/getActions'
import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

const INITIAL_NUMBER_OF_USERS = 20
const FavoritesList = dynamic(()=> import('./FavoritesList'))

const fetcher = async ()=>{
  const response = await GetUserFavorites(0, INITIAL_NUMBER_OF_USERS)
  return response
}

export default function FavoritesContainer() {
  const {data, error, isLoading} = useSWR('favorites', fetcher, {revalidateOnFocus: true, refreshInterval:1000, refreshWhenHidden:true})

  if(isLoading) return <CircularProgress color='primary'/>
  if(error) return <p>An errror ocurred while fetching your songs</p>

  return (
  <>
    <FavoritesList initialSongs={data.songs} />
  </>)
}