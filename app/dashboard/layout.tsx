import ButtonNavigation from "../ui/Navigation/ButtonNavigation";
import HeaderComponent from "../ui/Header/HeaderComponent";
import AuthComponent from "../lib/authComponent/AuthComponent";

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <AuthComponent/>
     <HeaderComponent showHome={false}/>
     <div className="h-full w-full">
      {children}
     </div>
      <ButtonNavigation />
    



    </div>
  )
}