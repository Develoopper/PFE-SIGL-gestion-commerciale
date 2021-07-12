import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { slugify, getTodayDate } from '../../helpers/myFunctions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Fab,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import transfertIcon from "../../images/transfertIcon.png"
import useForm from "../../hooks/useForm"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TransfertFAB({ setHovered }) {
  const caisseState = useSelector(state => state.caisseState);

	const dispatch = useDispatch();
  
  const [open, setOpen] = useState(false);

  const { handleChange, handleSubmit, formState, setForm } = useForm({ type: 'encaissement', montant: '', option: '' }, submit);

  const types = ["Chèque", "TPE", "Virement"];
  const destinations = ["Nabil", "Faycal", "Redouane", "Partage", "Banque"];
  const sources = ["Nabil", "Faycal"];
  const options = (
    formState.type === "encaissement" ? 
      types
    : formState.type === "transfert" ? 
      destinations
    :  
      sources
  );

  function handleChangeTransfertType(e) {
    const { value } = e.target;
    setForm({ type: value, montant: '', option: '' });
  };

  function handleClickOpen() {
    setOpen(true);
    setForm({ type: "encaissement", montant: '', option: '' });
  };

  function handleClose() {
    setOpen(false);
    setHovered(false);
  };

  function submit() {
    if (formState.montant === '' || formState.option === '') {
      dispatch({ type: "snack/set", payload: { 
        type: "warning", 
        msg: "Les champs sont vides !", 
        open: true
      } });
      return;
    }
    
    if (isNaN(formState.montant)) {
      dispatch({ type: "snack/set", payload: { 
        type: "warning", 
        msg: "Le montant est invalide !", 
        open: true
      } });
      return;
    }

    if (formState.type === 'encaissement' && Number(formState.montant) > caisseState[slugify(formState.option)]) {
      dispatch({ type: "snack/set", payload: { 
        type: "warning", 
        msg: "Le montant dépasse la limite !", 
        open: true
      } });
      return;
    }

    if (formState.type === 'transfert' && Number(formState.montant) > caisseState['espece']) {
      dispatch({ type: "snack/set", payload: {  
        type: "warning", 
        msg: "Le montant dépasse la limite !", 
        open: true
      } });
      return;
    }

    dispatch({ type: "caisse/transfert", payload: { 
      transfert: { ...formState, montant: Number(formState.montant) }, 
      dispatch 
    } });

    if (formState.type !== 'encaissement')
      dispatch({ type: 'transferts/unshift', payload: { ...formState, date: getTodayDate() } });

    dispatch({ type: "snack/set", payload: { 
      type: "success", 
      msg: "Effectué avec succès !", 
      open: true
    } });

    dispatch({ type: "saved/update", payload: { caisse: false } });

    handleClose();
  };

  const useStyles = makeStyles({
    scrollPaper: {
      alignItems: 'baseline'  // default center
    }
  });

  const classes = useStyles();

  return (
    <>
      <Fab 
        onClick={handleClickOpen} 
        onMouseEnter={() => setHovered(true)} 
        aria-label="add"
      >
        <img src={transfertIcon} style={{ height: 50, width: 50 }} alt=""/>
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" TransitionComponent={Transition} 
        // classes={{scrollPaper: classes.scrollPaper }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <DialogTitle id="form-dialog-title" style={{ paddingLeft: 10, paddingTop: 0 }}>Transfert de fonds</DialogTitle>
            <div style={{display: "flex", justifyContent: "space-around"}}>
              <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="encaissement" onChange={handleChangeTransfertType}> 
                  <FormControlLabel value="encaissement" control={<Radio color="primary"/>} label="Encaissement"/>
                  <div style={{ width: 20 }}></div>
                  <FormControlLabel value="transfert" control={<Radio color="primary"/>} label="Transfert"/>
                  <div style={{ width: 20 }}></div>
                  <FormControlLabel value="importation" control={<Radio color="primary"/>} label="Importation"/>
                </RadioGroup>
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <TextField
                margin="dense"
                id="name"
                label="Montant"
                fullWidth
                style={{ width: 200 }}
                name='montant'
                value={formState.montant}
                onChange={handleChange}
              />
              <div style={{ width: 30 }}/>
              <TextField
                id="standard-select-currency"
                select
                label={
                  formState.type === "encaissement" ? 
                    "Type"
                  : formState.type === "transfert" ? 
                    "Destination"
                  : 
                    "Source"
                }
                fullWidth
                style={{ width: 200 }}
                name='option'
                value={formState.option}
                onChange={handleChange}
              >
                {
                  options.map((option, index) => (
                    <MenuItem value={option} key={index}>
                      {option}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ fontWeight: "bold" }}>
              Annuler
            </Button>
            <Button color="primary" type='submit' style={{ fontWeight: "bold" }}>
              {
                formState.type === "encaissement" ?
                  "Encaisser"
                : formState.type === "transfert" ?
                  "Transferer"
                :
                  "Importer"
              }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}