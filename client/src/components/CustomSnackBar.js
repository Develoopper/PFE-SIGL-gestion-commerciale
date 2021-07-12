import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Grow } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

function GrowTransition(props) {
  return <Grow {...props}/>;
}

export default function CustomSnackBar() {
  const { type, msg, open } = useSelector(state => state.snackState);

	const dispatch = useDispatch();
  
  const handleClose = (e, reason) => {
    if (reason === 'clickaway')
      return;
    dispatch({ type: 'snack/update', payload: { open: false } });
  };

  return (
    <>
      {/* {React.cloneElement(children, { onClick: handleClick })} */}
      <Snackbar 
        open={open} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={GrowTransition}
        autoHideDuration={1500} 
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
