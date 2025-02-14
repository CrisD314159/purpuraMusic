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

  const fetcher = async () => {
    if(!id) return
    return await GetAlbumPage(id)
  }

  const {data, error, isLoading} = useSWR<Album>('getAlbum', fetcher)

  useEffect(()=>{
    if (!data || !data.pictureUrl ) return
    Vibrant.from(data.pictureUrl).getPalette().then((palette)=> {
      setPalette(palette.DarkVibrant?.hex ?? '#010101')
    })
  })

  if(error){
    return (
      <div>
        <h1>An error happened</h1>
      </div>
    )
  }

  if(isLoading){
    return (
      <div>
        <CircularProgress/>
      </div>
    )
  }

  return (

   <>
    {data && (
       <Box sx={{display:'flex', flexDirection:'column', width:'100%', marginTop:'80px', background:'#010101', alignItems:'center'}}>
       <div className='flex justify-center rounded-xl' style={{boxShadow:`3px 3px 60px 25px ${palette}`}}>
         <Image src={data.pictureUrl} width={220} height={220} alt='data Image' unoptimized/>
       </div>
       <p className='mt-5 text-xl font-medium'>{data.name}</p>

       <div className="w-full h-[340px]">
        <PlaylistSongList color={palette} initialSongs={data.songs ?? []}/>
       </div>


     </Box>
    )}
   </>
  

       
    
  )
  
}