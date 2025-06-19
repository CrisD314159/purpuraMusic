'use client'
import '@/css/glassEffect.css'
import { useAuthStore } from '@/store/useAuthStore' 
import LibraryListComponent from '@/ui/Library/LibraryListComponent'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import '@/css/linearGradientAnimation.css'

export default function LibraryPage(){
  const {isAuthenticated} = useAuthStore()

  if(isAuthenticated === false){
    return (
      <div className="flex flex-col h-full items-center justify-center bg-black rounded-2xl shadow-lg border gap-4 lineardark">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-400 neon-text text-center mb-6">
          Log in to save songs and create playlists on Púrpura Music
        </h2>
        <Button
          LinkComponent={Link}
          href='/'
          variant='contained'
          className="mt-4 px-6 py-2 text-lg font-semibold text-white bg-purple-700 hover:bg-purple-600 transition-all duration-300 rounded-lg shadow-md border border-purple-500"
        >
          Log In
        </Button>
        <style jsx>{`
          .neon-text {
            text-shadow: 0 0 5px #bb86fc, 0 0 10px #bb86fc, 0 0 20px #bb86fc;
          }
        `}</style>
      </div>
    );
  }

  return (
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
          pt: 15,
        }}
      >
     
          <div className="flex items-center w-full px-4">
            <h1 className="font-light text-[35px] font-[Montserrat]">Library</h1>
          </div>
          <LibraryListComponent/>

      </Box>
    </div>
  )
}