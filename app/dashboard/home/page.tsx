'use client'
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import '@/css/linearGradientAnimation.css'
import TopAlbumsList from "@/ui/home/TopAlbumsList";
import TopSongsList from "@/ui/home/TopSongsList";
import { useAuthStore } from "@/store/useAuthStore";
import PurpleDaylistComponent from "@/ui/home/PurpleDaylistComponent";

export default function Homepage(){
  const [greeting, setGreeting] = useState<string>("Good Day");
  const [color, setColor] = useState<string>("black");
  const {isAuthenticated} = useAuthStore()

  useEffect(()=>{
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
      setColor("linearMorning");
    }
    else if (hour < 18) {
      setGreeting("Good Afternoon");
      setColor("linearAfternoon");
    }
    else {
      setGreeting("Good Evening");
      setColor("linearEvening");
    }
  }, [])
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
        }}
      >
         <Box sx={{ flex: 1, overflowY: "auto", pb: "150px", width: "100%", pt: 10 }}>
          <div className={`w-full ${color} h-28 px-5 flex items-center justify-center`}>
            <h1 className="font-light text-[25px] sm:text-[35px] font-[Montserrat]">{`${greeting}, it's great to see you again`}</h1>
          </div>
          {isAuthenticated && <PurpleDaylistComponent/>}
          <TopSongsList/>
          <TopAlbumsList/>

         </Box>
        
      </Box>
    </div>
    
  )
}