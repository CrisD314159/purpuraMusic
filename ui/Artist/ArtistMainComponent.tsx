'use client'
import { GetArtistPage } from "@/lib/serverActions/GetActions"
import { Artist } from "@/lib/definitions/definitions"
import { Avatar, Box, CircularProgress, List } from "@mui/material"
import { Vibrant } from "node-vibrant/browser"
import { useEffect, useState } from "react"
import useSWR from "swr"
import MiniAlbumComponent from "../Album/MiniAlbumComponent"
import SongComponent from "../Song/SongComponent"
import { usePLayerStore } from "@/store/usePlayerStore" 

interface ArtistProps{
  id:string
}

export default function  ArtistMainComponent({id}:ArtistProps) {
  const [palette, setPalette] = useState<string>('#010101')

  const fetcher = async () => {
    if(!id) return
    return await GetArtistPage(id)
  }

  const {data, error, isLoading} = useSWR<Artist>('artist', fetcher)
  const {currentSong, playAlbum, isPlaying} = usePLayerStore()

  useEffect(()=>{
    if (!data || !data.imageUrl ) return
    Vibrant.from(data.imageUrl).getPalette().then((palette)=> {
      setPalette(palette.DarkVibrant?.hex ?? '#010101')
    })
  })

  const handlePlaySong = (index: number)=>{
  
    if(!data?.topSongs) return
    playAlbum(data.topSongs, index)
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
      <Box sx={{ flex: 1, overflowY: "auto", pb: "150px", px: 2, pt: 13, width: "100%" }}>
        <div className="w-full flex sm:flex-row sm:gap-5 sm:justify-between flex-col justify-center items-center">
          <div  style={{boxShadow:`3px 3px 80px 55px ${palette}`, borderRadius:'50%'}}>
            <Avatar src={data.imageUrl} style={{width:250, height:250}} alt="Artist profile pic"/>
          </div>
          <div className="flex sm:mx-11 flex-col justify-center">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <h2>{data.description}</h2>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-10">
            <p className="text-xl w-full text-left">Albums & Singles</p>
            <List className="w-full flex flex-row" style={{overflowX:'auto'}}>
              {data.albums?.map((album) => {
                return (
                  <MiniAlbumComponent  key={album.id} album={album}/>
                )
              })}
            </List>
          </div>

          <div className="w-full sm:px-6 px-2 mt-10">
            <h3 className="text-xl">Top Songs</h3>
            <List className="w-full flex flex-row flex-wrap" style={{overflowX:'auto'}}>
              {data.topSongs?.map((song, index) => {
                        const isCurrent = currentSong?.id === song.id
                        return (
                          <div key={song.id} className='w-full flex items-center'>
                            <h4 className="text-xl font-bold mr-5">{index+1}</h4>
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