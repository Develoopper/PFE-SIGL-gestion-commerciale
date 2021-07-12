import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  Layout: {
    // margin: theme.spacing(1),
    position: 'relative',
  },
  fabProgress: {
    color: "white",
    position: 'absolute',
    top: -1,
    left: -1,
    zIndex: 1,
  }
}));

export default function SaveButton({ disabled, handleSave, savedState, dispatch }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();
  const currentPage = history.location.pathname.slice(1);

   async function handleButtonClick() {
    if (!loading) {
      dispatch({ type: 'saved/update', payload: { [currentPage]: false } });
      setLoading(true);
      if (await handleSave())
        dispatch({ type: 'saved/update', payload: { [currentPage]: true, caisse: true } });
      setLoading(false);
    }
  };

  return (
    <div className={classes.Layout}>
      <IconButton 
        color="inherit"
        disabled={disabled}
        onClick={handleButtonClick}
      >
        {
          savedState[currentPage] ? 
            <CheckIcon/> 
          : 
            <SaveIcon/>
        }
      </IconButton>
      {loading && <CircularProgress size={50} className={classes.fabProgress}/>}
    </div>
  );
}
