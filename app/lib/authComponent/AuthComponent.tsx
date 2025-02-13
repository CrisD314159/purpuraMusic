'use client'
import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkIsloggedIn } from "../authChecks";
import { useAuthStore } from "@/app/store/useAuthStore";


export default function AuthComponent() {
  const { data, error } = useSWR("checkAuth", checkIsloggedIn);
  const {setIsAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setIsAuthenticated();
     
        router.replace("/dashboard/home"); // Redirige si ya está autenticado
      
    } else if (error) {
    

        router.replace("/dashboard/home"); // Redirige si no está autenticado
      
    }
  }, [data, error, setIsAuthenticated, router]);

  return <></>;
}