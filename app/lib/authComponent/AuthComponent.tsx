'use client'
import useSWR from "swr";
import { useEffect } from "react";
import { checkIsloggedIn } from "../authChecks";
import { useAuthStore } from "@/app/store/useAuthStore";


export default function AuthComponent() {
  const { data, error } = useSWR("checkAuth", checkIsloggedIn);
  const {setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (data) {
      setIsAuthenticated();
      
    } 
  }, [data, error, setIsAuthenticated]);

  return <></>;
}