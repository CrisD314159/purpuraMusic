
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { DeletePlaylist } from '@/lib/serverActions/DeleteActions';


interface DeletePlaylistDialogProps {
  playlistId: string
  mutate: ()=> void
  setClose: ()=> void
}


export default function DeletePlaylistDialog({mutate, playlistId, setClose}:DeletePlaylistDialogProps) {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
   try {
    const response = await DeletePlaylist(playlistId);
    if(response.success){
      mutate()
      setClose()
      handleClose()
    }
   } catch {
      handleClose()
   }
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon color='error'/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this playlist?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' onClick={handleLogout} autoFocus>
            Delete Playlist
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
