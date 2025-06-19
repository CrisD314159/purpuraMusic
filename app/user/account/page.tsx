'use client'

import { GetUserProfile } from "@/lib/serverActions/GetActions";
import EditAccountDialog from "@/ui/Dialog/EditAccountDialog";
import { Avatar, CircularProgress, Typography, Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";


import useSWR from "swr";

interface UserAccount {
  id: string;
  email: string;
  name: string;
  profilePicture: string;
  isVerified: boolean;
}

export default function AccountPage() {
  const { data, error, isLoading, mutate } = useSWR<UserAccount>('userData', GetUserProfile);
  const [reload, setReload] = useState(false);


 useEffect(()=>{
    if(reload){
      mutate()
      setReload(false)
    }
 }, [reload, mutate])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <CircularProgress sx={{ color: '#9b5de5' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <Typography color="error" variant="h6">Failed to load user data</Typography>
      </div>
    );
  }

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #240046, #9b5de5, #5a189a)",
        color: "#fff",
        textShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <Avatar
        src={data?.profilePicture}
        alt={`${data?.name}`}
        sx={{
          width: 250,
          height: 250,
          border: "3px solid #fff",
          boxShadow: "0 0 30px #9b5de5",
          marginBottom: '1.5rem',
        }}
      />

      <Typography variant="h4" fontWeight="bold" style={{ fontSize: "2rem" }}>
        {data?.name}
      </Typography>

      <Typography variant="subtitle1" style={{ fontSize: "1.2rem", opacity: 0.8 }}>
        {data?.email}
      </Typography>

      <Chip
        label={data?.isVerified ? "Verified Account" : "Unverified Account"}
        style={{
          marginTop: "1.5rem",
          fontSize: "1rem",
          color: "#fff",
          background: data?.isVerified ? "#03dac5" : "#f72585",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      />

        <Box mt={4} textAlign="center">
          <EditAccountDialog setReload={setReload} name={data?.name ?? ""}/>
        </Box>
    </div>
  );
}