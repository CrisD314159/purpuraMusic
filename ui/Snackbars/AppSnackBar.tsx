import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";


interface SnackbarProps{
  message: string
  open:boolean
  setOpen :(value:boolean)=> void
  type: 'error' | 'success'
}

export default function AppSnackBar({message, open, setOpen, type}:SnackbarProps) {

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar onClose={handleClose} open={open} autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert variant="standard" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}