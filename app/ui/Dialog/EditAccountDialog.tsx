
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import { Box, Grow } from '@mui/material';
import EditAccountForm from '../forms/EditAccountForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow ref={ref} {...props}  timeout={100}/>;
});

export default function EditAccountDialog({initialCountry, initialFirstName, initialSurName, setReload} : 
  {initialCountry: number, initialFirstName: string, initialSurName: string, setReload: React.Dispatch<React.SetStateAction<boolean>>}) {
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
        fullScreen
        open={open}
        onClose={handleClose}
        slots={{ transition: Transition }}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#010101' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit account
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width:'100%', height:'100%', backgroundColor: '#010101' }}>
         <EditAccountForm initialCountry={initialCountry} setReload={setReload} initialFirstName={initialFirstName} initialSurName={initialSurName}/>
        </Box>
      </Dialog>
    </>
  );
}
