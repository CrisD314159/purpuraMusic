import Image from "next/image";
import MenuDrawer from "../Drawer/MenuDrawer";
import '@/css/glassEffect.css'

export default function HeaderComponent({showHome}:{showHome:boolean}) {
  return (
      <header className="relative flex justify-between w-full p-2 glass" style={{zIndex:100}}>
        <MenuDrawer showHome={showHome}/>
        <Image src="/purpura-logo.png" alt="logo" width={50} height={50} className="absolute left-0 right-0 top-0 bottom-0 m-auto " />
      </header>
  )
}