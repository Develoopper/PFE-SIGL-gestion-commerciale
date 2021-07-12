import Axios from "./AxiosInstance";
import { getTodayDate2, toObjectsArray, toObject } from './myFunctions';
import csv from 'csvtojson';

export function exportCSV(currentTable, currentPage, dispatch) {
  const exportPlugin = currentTable.current.hotInstance.getPlugin('exportFile');
  exportPlugin.downloadFile('csv', { filename: currentPage + " " + getTodayDate2(), columnDelimiter: ';' });
  
  dispatch({ type: 'snack/set', payload: { 
    type: "success", 
    msg: "Document téléchargé !", 
    open: true
  } });
};

export function importCSV(currentPage, dispatch, input) {
  const file = input.files[0];
  
  if (file.name.split(" ")[0] !== currentPage) {
    dispatch({ type: 'snack/set', payload: { 
      type: "warning", 
      msg: "Verifiez le nom du fichier importé !", 
      open: true
    } });
    return;
  }
  
  const reader = new FileReader();

  reader.onload = async () => {
    try {
      const _csv = csv({ noheader: true, output: "csv", delimiter: ";", ignoreEmpty: false, ignoreColumns: false });
      const csvData = await _csv.fromString(reader.result);
      // console.log(csvData);
      if (currentPage === "caisse") {
        dispatch({ type: 'caisse/set', payload: toObject(csvData.shift()) });
        dispatch({ type: 'transferts/set', payload: toObjectsArray('transferts', csvData) });
      } else {
        dispatch({ type: currentPage + '/set', payload: toObjectsArray(currentPage, csvData) });
      }

      dispatch({ type: 'saved/update', payload: { [currentPage]: false } });

      dispatch({ type: 'snack/set', payload: { 
        type: "success", 
        msg: "Document importé !", 
        open: true
      } });
    } catch(error) { 
      console.log(error)
      dispatch({ type: 'snack/set', payload: { 
        type: "warning", 
        msg: "Echec d'importation !", 
        open: true
      } });
    }
    // console.log(csvJSON(reader.result));
  };

  reader.onerror = () => {
    console.log(reader.error);
    dispatch({ type: 'snack/set', payload: { 
      type: "warning", 
      msg: "Echec d'importation !", 
      open: true
    } });
  };

  reader.readAsText(file);
}

export async function save(currentTable, currentPage, caisseState, dispatch, transferts) {
  let objArr = null;

  if (currentPage === "caisse") {
    objArr = transferts;
    currentPage = "transferts";
  } else {
    const data = currentTable.current.hotInstance.getSourceData();
    // objArr = toObjectsArray(currentPage, data);
    objArr = data;
  }

  try {
    await Axios.post("/caisse", caisseState)
    if (currentPage === "transferts")
      await Axios.post("/transferts", transferts)
    else
      await Axios.post("/" + currentPage, objArr)
    dispatch({ type: 'snack/set', payload: { 
      type: "success", 
      msg: "Effectué avec succès !", 
      open: true
    } });
    return true;
  } catch (error) {
    console.log(error.response.status);
    dispatch({ type: 'snack/set', payload: { 
      type: "error", 
      msg: error.response.status === 401 ? "Vous êtes déconnecté !" : "Erreur du serveur !", 
      open: true
    } });
    return false;
  }
};

export function addRow(currentTable, dispatch) {
  currentTable.current.hotInstance.alter('insert_row', 0);
  // this.param.current.hotInstance.setDataAtCell(0, 0, '17/02/2021');
  // console.log(this.param.current.hotInstance);
  dispatch({ type: 'snack/set', payload: { 
    type: "success", 
    msg: "Ligne ajouté !", 
    open: true
  } });
};