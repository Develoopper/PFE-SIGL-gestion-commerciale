import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Axios from '../../helpers/AxiosInstance';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Email as EmailIcon,
  GetApp as DownloadIcon,
  Publish as UploadIcon,
} from '@material-ui/icons';
import SaveButton from "./SaveButton";
import { getTodayDate2 } from "../../helpers/myFunctions";
import { exportCSV, importCSV, save, addRow } from "../../helpers/hotFunctions";
import jsonexport from 'jsonexport';

export default function AppBar() {
  const currentTableState = useSelector(state => state.currentTableState);
  const loadingState      = useSelector(state => state.loadingState);
  const userState         = useSelector(state => state.userState);
  const savedState        = useSelector(state => state.savedState);
  const caisseState       = useSelector(state => state.caisseState);
  const transfertsState   = useSelector(state => state.transfertsState);

	const dispatch = useDispatch();

  const history = useHistory();
  const currentPage = history.location.pathname.slice(1);

  const fileInput = useRef(null);

  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const [documentMenuAnchor, setDocumentMenuAnchor] = useState(null);

  async function handleLogout() {
    try {
      await Axios.post('/auth/logout', { refreshToken: localStorage.refreshToken });
      localStorage.setItem("accessToken", '');
      localStorage.setItem("refreshToken", '');
      dispatch({ type: 'user/set', payload: null });
      setAccountMenuAnchor(null);
      history.push("login");
    } catch (error) {
      console.log(error);
    }
  }
  
  async function handleGlobalLogout() {
    try {
      await Axios.post('/auth/globalLogout', { refreshToken: localStorage.refreshToken });
      localStorage.setItem("accessToken", '');
      localStorage.setItem("refreshToken", '');
      dispatch({ type: 'user/set', payload: null });
      setAccountMenuAnchor(null);
      history.push("login");
    } catch (error) {
      console.log(error);
    }
  }
     
  function handleClickUsers() {
    setAccountMenuAnchor(null);
    history.push("login");
  }

  async function handleExport() {
    setDocumentMenuAnchor(null);
    if (currentPage !== "caisse")
      exportCSV(currentTableState, currentPage, dispatch);
    else {
      const fileContent = [...transfertsState].filter(transfert => transfert.type !== "encaissement");
      jsonexport(fileContent, { rowDelimiter: ';', includeHeaders: false }, (err, csv) => {
        if (err)
          return console.error(err);
        const _csv = Object.values(caisseState).join(";") + "\n" + csv;

        const element = document.createElement("a");
        const file = new Blob([_csv], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = "caisse " + getTodayDate2() + ".csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

        // console.log(_csv);
        dispatch({ type: 'snack/set', payload: { 
          type: "success", 
          msg: "Document téléchargé !", 
          open: true
        } });
      });
    }
  }
  
  function handleImport() {
    setDocumentMenuAnchor(null);
    // document.getElementById('fileInput').click();
    fileInput.current.click();
  }
  
  async function handleSave() {
    setDocumentMenuAnchor(null);
    return await save(currentTableState, currentPage, caisseState, dispatch, transfertsState);
  }

  function handleAddRow() {
    setDocumentMenuAnchor(null);
    return addRow(currentTableState, dispatch);
  }
  
  return (
    <div className="appBar">
      <div style={{ marginLeft:30, fontSize:40, fontWeight: 400 }}>
        {currentPage.toUpperCase()}
      </div>
      <div style={{ marginLeft:30, fontSize:40, fontWeight: 400 }}>Pépinière Polo Plantes</div>
      <div className="options">
      {
        currentPage !== "factures" &&
          <div style={{ display: "flex" , alignItems: "center" }}>
            {/* {
              currentPage === "caisse" &&
                <IconButton 
                  disabled={loadingState} 
                  color="inherit" 
                  // onClick={() => exportCSVState.func(exportCSVState.param, setSnack)}
                  onClick={null} 
                >
                  <EmailIcon/>
                </IconButton>
            } */}
            <IconButton 
              disabled={loadingState} 
              color="inherit" 
              // onClick={() => exportCSVState.func(exportCSVState.param, setSnack)}
              aria-controls="simple-menu"
              aria-haspopup="true" 
              onClick={e => setDocumentMenuAnchor(e.currentTarget)} 
            >
              <DescriptionIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={documentMenuAnchor}
              keepMounted
              open={Boolean(documentMenuAnchor)}
              onClose={() => setDocumentMenuAnchor(null)}
            >
              <MenuItem onClick={handleExport}>{/* <DownloadIcon/> */} Télécharger</MenuItem>
              <MenuItem onClick={handleImport}>{/* <UploadIcon/> */} Importer</MenuItem>
            </Menu>

            <input 
              type="file" id="fileInput" style={{ display: "none" }}
              ref={fileInput}
              accept=".csv"
              onChange={() => importCSV(
                currentPage,
                dispatch, 
                fileInput.current,
              )}
            />

            <SaveButton 
              disabled={loadingState} 
              handleSave={handleSave}
              savedState={savedState}          
              dispatch={dispatch}          
            />

            {
              currentPage !== "caisse" &&
                <IconButton 
                  disabled={loadingState} 
                  color="inherit"
                  onClick={handleAddRow} 
                >
                  <AddIcon/>
                </IconButton>
            }
          </div>
      }
        <div style={{ marginLeft:20, fontSize:18 }}>{userState}</div>
        <IconButton color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={e => setAccountMenuAnchor(e.currentTarget)}>
          <AccountCircleIcon fontSize="large"/>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={accountMenuAnchor}
          keepMounted
          open={Boolean(accountMenuAnchor)}
          onClose={() => setAccountMenuAnchor(null)}
        >
          {/* <MenuItem onClick={handleClickUsers}>Utilisateurs</MenuItem> */}
          <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
          <MenuItem onClick={handleGlobalLogout}>Déconnexion globale</MenuItem>
        </Menu>
      </div>
    </div>
  );
}