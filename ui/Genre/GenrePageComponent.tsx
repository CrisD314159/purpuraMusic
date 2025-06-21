'use client'
import { GetTopSongsByGenre } from "@/lib/serverActions/GetActions"
import { Genre } from "@/lib/definitions/definitions"
import { Box, CircularProgress, List } from "@mui/material"
import useSWR from "swr"
import SongComponent from "../Song/SongComponent"
import { usePLayerStore } from "@/store/usePlayerStore" 

interface GenrePageComponentProps{
  id:string
}

export default function  GenrePageComponent({id}:GenrePageComponentProps) {

  const fetcher = async () => {
    if(!id) return
    return await GetTopSongsByGenre(id)
  }

  const {data, error, isLoading} = useSWR<Genre>('topSongsGenre', fetcher)
  const {currentSong, playAlbum, isPlaying} = usePLayerStore()


  const handlePlaySong = (index: number)=>{
  
    if(!data?.songs) return
    playAlbum(data.songs, index)
  }


  if(isLoading) return (
  <div className="w-full flex flex-col h-screen items-center pt-40">
    <CircularProgress/>
  </div>)

  if(error) return (
  <div className="w-full flex flex-col h-screen items-center pt-40">
    <h1>An error happened</h1>
  </div>)


  return (
    <>
    {data && (
       <div className="w-full flex flex-col h-screen items-center gap-3">
      <Box
       sx={{
         display: "flex",
         flexDirection: "column",
         width: "100%",
         height: "100vh",
         backgroundColor: "#010101",
         color: "#fff",
         fontFamily: "Montserrat",
       }}
     >
      <Box sx={{ flex: 1, overflowY: "auto", pb: "150px", pt: 13, width: "100%", background: `linear-gradient(180deg, ${data.color}70 30%, ${data.color}20 70%)` }}>

        <div className="w-full flex sm:flex-row sm:gap-5 sm:justify-between px-4 py-5 flex-col justify-center items-center"
        >
          <div className="flex sm:mx-11 flex-col justify-center">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <h2>{data.description}</h2>
          </div>
        </div>


          <div className="w-full sm:px-6 px-4 mt-10">
            <h3 className="text-xl">Top Songs</h3>
            <List className="w-full flex flex-row flex-wrap" style={{overflowX:'auto'}}>
              {data.songs?.map((song, index) => {
                        const isCurrent = currentSong?.id === song.id
                        return (
                          <div key={song.id} className='w-full flex items-center'>
                            {isCurrent && isPlaying ? (
                              <SongComponent  current song={song} handlePLaySong={handlePlaySong} index={index} />
                            ) : (
                              <SongComponent  current={false} song={song} handlePLaySong={handlePlaySong} index={index} />
                            )}
                          </div>
                        )
                      })}
            </List>
          </div>
      </Box>
     </Box>
       </div>

    )}
    </>

  )
  
}