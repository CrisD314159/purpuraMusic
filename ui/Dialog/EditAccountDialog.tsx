
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { Box, DialogContent, Grow } from '@mui/material';
import EditAccountForm from '../forms/EditAccountForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow ref={ref} {...props}  timeout={100}/>;
});

interface EditAccountProps{
  name:string,
  setReload: (value:boolean) => void
}

export default function EditAccountDialog({name, setReload}:EditAccountProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color='secondary' onClick={handleClickOpen}>
        Edit Account
      </Button>
      <Dialog

        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#010101' }}>
          <Toolbar
          sx={{ width:'100%', height:'100%', backgroundColor: '#010101' }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ backgroundColor: '#010101' }}>
          <Box sx={{ width:'100%', height:'100%', backgroundColor: '#010101' }}>
          <EditAccountForm name={name} setReload={setReload}  />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
