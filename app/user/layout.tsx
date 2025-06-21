import HeaderComponent from "../../ui/Header/HeaderComponent";

export default function UserLayout({ children } : { children: React.ReactNode }) {
    return (
        <div className="h-full flex flex-col items-center">
          <HeaderComponent showHome={true}/>
            {children}
        </div>
    )
 
}