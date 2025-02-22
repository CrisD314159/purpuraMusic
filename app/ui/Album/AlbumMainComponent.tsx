'use client'
import { Box, CircularProgress } from "@mui/material"
import Image from "next/image"
import { Vibrant } from "node-vibrant/browser"
import { useEffect, useState } from "react"
import { Album } from "@/app/lib/definitions"
import useSWR from "swr"
import { GetAlbumPage } from "@/app/lib/actions/serverActions/getActions"
import PlaylistSongList from "../Playlists/PlayListDialog/PlaylistSongList"


interface AlbumProps{
  id:string
}

export default function AlbumMainComponent({id}:AlbumProps) {
  const [palette, setPalette] = useState<string>('#010101')
  const [album, setAlbum] = useState<Album | null>(null)  

  const fetcher = async (id: string) => {
    const album = await GetAlbumPage(id)
    setAlbum(album)
    return album
  }

  const {error, isLoading} = useSWR<Album>(id, fetcher, {revalidateOnFocus:true })

  useEffect(()=>{
    if (!album || !album.pictureUrl ) return
    Vibrant.from(album.pictureUrl).getPalette().then((palette)=> {
      setPalette(palette.DarkVibrant?.hex ?? '#010101')
    })
  })

  if(error){
    return (
      <div className="w-full flex flex-col h-screen items-center pt-40"> 
        <h1>An error happened</h1>
      </div>
    )
  }

  if(isLoading){
    return (
      <div className="w-full flex flex-col h-screen items-center pt-40">
        <CircularProgress/>
      </div>
    )
  }

  return (

   <>
    {album && (
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
          <Box sx={{ flex: 1, overflowY: "auto", pb: "150px", px: 2, pt: 15, width: "100%" }}>
            <div className="flex flex-col items-center">
              <div className='flex justify-center rounded-xl' style={{boxShadow:`3px 3px 60px 25px ${palette}`}}>
                <Image src={album.pictureUrl ?? ""} width={220} height={220} alt='data Image' unoptimized/>
              </div>
              <p className='mt-5 text-xl font-medium'>{album.name}</p>
            </div>

          <div className="w-full">
            <PlaylistSongList color={palette} initialSongs={album.songs ?? []}/>
          </div>


        </Box>
     </Box>

      </div>
    )}
   </>
  

       
    
  )
  
}