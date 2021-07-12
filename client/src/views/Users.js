import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { HotTable } from '@handsontable/react';

export default function UsersTable() {
  const loadingState  = useSelector(state => state.loadingState);
	const usersState = useSelector(state => state.usersState);

  const dispatch = useDispatch();

  const hotTableComponent = useRef(null);

  useEffect(() => {
    if (!loadingState)
      dispatch({ type: 'currentTable/set', payload: hotTableComponent });
  }, [loadingState])

  const settings = {
    rowHeaders: true,
    stretchH:'all',
    dropdownMenu: true,
    contextMenu: true,
    filters: true,
    columnSorting: true,
    afterChange(changes, source) {
      if (source === 'loadData')
				return

			dispatch({ type: 'saved/update', payload: { users: false } });

      changes.forEach(([row, prop, oldVal, newVal]) => {
        if (newVal === null) {
          this.setDataAtRowProp(row, prop, "")
          return;
        }
      })
		},
    columns: [
      {
        title: "Nom d'utilisateur",
        data: "username",
      },
      {
        title: "Mot de passe",
        data: "password",
      }
    ],
    language: 'fr-FR'
  }
    
  return (
    loadingState ?  
      <CircularProgress color='primary' size={150} thickness={2}/>
    : 
      <HotTable
        ref={hotTableComponent}
        data={usersState} 
        settings={settings}
        licenseKey='non-commercial-and-evaluation'
      />
  );
}