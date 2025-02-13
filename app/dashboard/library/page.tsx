'use client'
import '@/app/css/glassEffect.css'
import { useAuthStore } from '@/app/store/useAuthStore'
import LibraryListComponent from '@/app/ui/Library/LibraryListComponent'
import { Button } from '@mui/material'
import Link from 'next/link'
import '@/app/css/linearGradientAnimation.css'
export default function LibraryPage(){
  const {isAuthenticated} = useAuthStore()


  if(isAuthenticated === false){
    return (
      <div className="flex flex-col h-full items-center justify-center  bg-black rounded-2xl shadow-lg border gap-4 lineardark">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-400 neon-text text-center mb-6">
            Log in to save songs and create playlists on Púrpura Music
          </h2>
          <Button LinkComponent={Link} href='/' variant='contained'
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
    <div className="flex flex-col items-center pt-6 h-full w-full">
      <div className="flex items-center justify-between top-14 w-full mt-20" style={{paddingLeft:15}}>
        <h1 className="font-light" style={{fontSize:35, fontFamily:'Montserrat'}}>Library</h1>
      </div>
      <LibraryListComponent />
    </div>
  )
}