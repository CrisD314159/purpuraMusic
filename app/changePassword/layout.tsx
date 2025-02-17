import '@/app/css/linearGradientAnimation.css'
export default function ChangePasswordLayout({children}:{children: React.ReactNode}) {
  return (
    <div className="w-full h-full flex justify-center items-center linear">
      {children}
    </div>
  )
}