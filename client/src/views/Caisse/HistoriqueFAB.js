import React from 'react';
import historiqueIcon from "../../images/historiqueIcon.png"
import Historique from './Historique';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Fab
} from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

export default function TransferFAB({ setHovered }) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  };

  function handleClose() {
    setHovered(false)
    setOpen(false);
  };

  return (
    <>
      <Fab 
        onClick={handleClickOpen} 
        style={{ height: 40, width: 40 }}
      >
        <img src={historiqueIcon} style={{ width: 45 }} alt=""/>
      </Fab>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth={"sm"}
        scroll={"paper"}
      >
        <DialogTitle id="form-dialog-title">Historique des transferts</DialogTitle>
        <DialogContent dividers={true}>
          <Historique/>
        </DialogContent>
      </Dialog>
    </>
  );
}