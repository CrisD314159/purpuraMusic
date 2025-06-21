import { Playlist } from "@/lib/definitions/definitions";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Image from "next/image";

interface MiniPlaylistProps{
  playlist: Playlist
  setOpen ?: ()=> void
}

export default function MiniPlayListComponent({playlist, setOpen}:MiniPlaylistProps) {

  return (
    <ListItem key={playlist.id} style={{width:200, height:200, scrollbarWidth:'none'}}>
              <ListItemButton onClick={setOpen} sx={{display:'flex', width:'100%', height:'100%', flexDirection:'column', alignItems:'center'}}>
                <Image src={playlist.imageUrl} alt='Playlist Image' width={150} height={150} unoptimized/>
                
                <div style={{ width: 190, display: 'flex', justifyContent: 'center' }}>
                  <ListItemText 
                    primary={playlist.name} 
                    sx={{
                      fontFamily: 'Montserrat',
                      textAlign: 'center',
                      whiteSpace: 'wrap',
                    }}
                  />
                </div>
                
              </ListItemButton>
      </ListItem>
  )
  
}