'use client'
import { Genre } from "@/lib/definitions/definitions";
import { GetAllGenres } from "@/lib/serverActions/GetActions";
import { Box, CircularProgress, List } from "@mui/material";
import useSWR from "swr";
import GenreCard from "./GenreCard";

export default function GenresViewComponent() {
  const {data, error, isLoading} =  useSWR<Genre[]>('genres', GetAllGenres)


  if(error){
    return (
    <Box
       sx={{
         display: "flex",
        justifyContent:'center',
        alignItems:'center',
         width: "100%",
         height: "100vh",
         backgroundColor: "#010101",
         color: "#fff",
         fontFamily: "Montserrat",
       }}
     >
      <p>{error.message}</p>
     </Box>

    )

  }

  if(isLoading){
    return (
    <Box
       sx={{
         display: "flex",
        justifyContent:'center',
        alignItems:'center',
         width: "100%",
         height: "100vh",
         backgroundColor: "#010101",
         color: "#fff",
         fontFamily: "Montserrat",
       }}
     >
      <CircularProgress/>
     </Box>

    )
  }

  return (
    <>
    {data && (


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
        <Box sx={{ flex: 1, overflowY: "auto", pb: "150px", px: 1, pt: 15, width: "100%" }}>
          <List sx={{ width: '100%', display:'flex', flexWrap:'wrap', gap:'20px', justifyContent:'center' }}>
            {data.map((genre, index) => {
              return (
                <GenreCard genre={genre} key={index}/>
              );
            })}
          </List>
        </Box>

     </Box>
    )}
    </>
  )
  
}