import ButtonNavigation from "../ui/Navigation/ButtonNavigation";
import HeaderComponent from "../ui/Header/HeaderComponent";

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="relative w-full h-full flex flex-col items-center">
     <HeaderComponent showHome={false}/>
      {children}
      <ButtonNavigation />
    </div>
  )
}