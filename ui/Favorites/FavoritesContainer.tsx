'use client'
import { GetUserFavorites } from '@/lib/serverActions/GetActions'
import { CircularProgress, IconButton } from '@mui/material'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useEffect } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';

const INITIAL_NUMBER_OF_USERS = 20
const FavoritesList = dynamic(()=> import('./FavoritesList'))

const fetcher = async () => {
  const response = await GetUserFavorites(0, INITIAL_NUMBER_OF_USERS)
  return response
}

interface FavoritesContainerProps {
  open: boolean
}

export default function  FavoritesContainer({ open }: FavoritesContainerProps) {
  const { data, error, isLoading, mutate } = useSWR('favorites', fetcher, {
    revalidateOnFocus: true,
    refreshWhenHidden: true,
  });

  // Forzar actualización al abrir el diálogo
  useEffect(() => {
    if (open) {
      mutate(undefined, true); // Se asegura de obtener los datos más recientes
    }
  }, [open, mutate]);

  if (isLoading) return <CircularProgress color='primary' sx={{mt:5}}/>;
  if (error) return <p style={{marginTop:5}}>An error occurred while fetching your songs</p>;

  return (
    <>
      <IconButton onClick={() => mutate(undefined, true)} disabled={isLoading} sx={{ position:'absolute', top:240, right:'5%'}}>
        <RefreshIcon />
      </IconButton>
      {data?.songs.length > 0 ?
        <FavoritesList initialSongs={data?.songs ?? []} />
        :
        <p style={{marginTop:5}}>
          You do not have any favorite songs yet
        </p>
      }
    </>
  );
}