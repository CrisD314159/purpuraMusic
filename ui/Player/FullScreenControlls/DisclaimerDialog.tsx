'use client'
import { Dialog, DialogContent, DialogTitle, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

interface DiscalimerProps{
  message:string
}
export default function DisclaimerDialog({message}:DiscalimerProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = ()=>{
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
  }

  return (
    <>
    <IconButton onClick={handleOpen}>
      <InfoIcon/>
    </IconButton>
    <Dialog onClose={handleClose} open={open}>
      <Toolbar>
        <IconButton onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
        <DialogTitle>Disclaimer</DialogTitle>
      </Toolbar>
      <DialogContent>
        <p className="whitespace-pre-line">{message}</p>
      </DialogContent>
    </Dialog>
    </>
  )
  
}