import HeaderComponent from "../ui/Header/HeaderComponent";

export default function UserLayout({ children } : { children: React.ReactNode }) {
    return (
        <div>
          <HeaderComponent showHome={true}/>
            {children}
        </div>
    )
 
}