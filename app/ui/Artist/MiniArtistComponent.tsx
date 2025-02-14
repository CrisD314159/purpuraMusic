import { Artist } from "@/app/lib/definitions";
import { Avatar, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";

interface MiniPlaylistProps{
  artist: Artist
}

export default function MiniArtistComponent({artist}:MiniPlaylistProps) {

  return (
    <ListItem key={artist.id} style={{width:200, height:200, scrollbarWidth:'none'}}>
              <ListItemButton LinkComponent={Link} href={`/dashboard/artists/${artist.id}`} sx={{display:'flex', width:'100%', height:'100%', flexDirection:'column', alignItems:'center'}}>
                <Avatar src={artist.imageUrl ?? ''} alt='artist Image' style={{width:100, height:100}}/>
                
                <div style={{ width: 190, display: 'flex', justifyContent: 'center' }}>
                  <ListItemText 
                    primary={artist.name} 
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