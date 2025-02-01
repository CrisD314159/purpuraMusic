import FavoritesLibraryComponent from "./FavoritesLibraryComponent";
import PlayListsList from "./PlayListsList";


export default function LibraryListComponent(){
  return (
    <div className="flex flex-col items-center h-5/6 absolute bottom-0 w-full">
      <div style={{width:'100%' , height:'95%', position:'absolute', display:'flex', flexDirection:'column', alignItems:'center', bottom:0, backgroundColor:'#010101', color:'#fff', fontFamily:'Montserrat'}}>
          <FavoritesLibraryComponent/>
          <div className="flex mt-7 w-full " style={{paddingLeft:15}}>
            <h2 className="font-light" style={{fontSize:25, fontFamily:'Montserrat'}}>Your Playlists</h2>
          </div>
          <PlayListsList/>
      </div>
    </div>
  )
}