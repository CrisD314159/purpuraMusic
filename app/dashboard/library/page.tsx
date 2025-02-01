import '@/app/css/glassEffect.css'
import LibraryListComponent from '@/app/ui/Library/LibraryListComponent'
export default function LibraryPage(){
  return (
    <div className="flex flex-col items-center pt-6 h-full w-full">
      <div className="flex items-center justify-between top-14 w-full mt-20" style={{paddingLeft:15}}>
        <h1 className="font-light" style={{fontSize:35, fontFamily:'Montserrat'}}>Library</h1>
      </div>
      <LibraryListComponent />
    </div>
  )
}