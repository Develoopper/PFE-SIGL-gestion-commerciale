import React from 'react'
import { Offline, Online } from "react-detect-offline";
import CloudOffIcon from '@material-ui/icons/CloudOff';

export default function InternetStatus() {
  return (
    <Offline>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20 }}>
        <CloudOffIcon fontSize='large'/>
        Hors connexion
      </div>
    </Offline>
  )
}