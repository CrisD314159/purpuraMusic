import { create } from "zustand"



interface AuthStore{
  isAuthenticated: boolean

  setIsAuthenticated: ()=> void
  setIsNotAuthenticated: ()=> void
}




export const useAuthStore = create<AuthStore>((set)=> ({
  isAuthenticated : false,
  setIsAuthenticated: ()=>{
    set({
      isAuthenticated : true
    })

  },
  setIsNotAuthenticated: ()=>{
    set({
      isAuthenticated : false
    })
  }

}))