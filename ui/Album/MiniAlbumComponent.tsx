import { Album } from "@/lib/definitions/definitions";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface MiniPlaylistProps{
  album: Album
}

export default function MiniAlbumComponent({album}:MiniPlaylistProps) {

  return (
    <ListItem key={album.id} style={{width:200, height:200, scrollbarWidth:'none'}}>
              <ListItemButton LinkComponent={Link} href={`/dashboard/albums/${album.id}`} sx={{display:'flex', width:'100%', height:'100%', flexDirection:'column', alignItems:'center'}}>
                <Image src={album.pictureUrl} alt='Album Image' width={150} height={150} unoptimized/>
                
                <div style={{ width: 190, display: 'flex', justifyContent: 'center' }}>
                  <ListItemText 
                    primary={album.name} 
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