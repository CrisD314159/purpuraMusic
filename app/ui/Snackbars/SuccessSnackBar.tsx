import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

export default function SuccessSnackBar({message, open, setOpen}:{message:string, open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {

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
      <Alert variant="standard">
        {message}
      </Alert>
    </Snackbar>
  )
}