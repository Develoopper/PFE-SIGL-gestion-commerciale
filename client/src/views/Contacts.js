import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { HotTable } from '@handsontable/react';

export default function Contacts() {
  const loadingState  = useSelector(state => state.loadingState);
	const contactsState = useSelector(state => state.contactsState);

  const dispatch = useDispatch();

  const hotTableComponent = useRef(null);

  useEffect(() => {
    if (!loadingState) {
      dispatch({ type: 'currentTable/set', payload: hotTableComponent });
    }
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

			dispatch({ type: 'saved/update', payload: { contacts: false } });

      changes.forEach(([row, prop, oldVal, newVal]) => {
        if (newVal === null) {
          this.setDataAtRowProp(row, prop, "")
          return;
        }
      })
		},
    columns: [
			{
				title: "Type",
				type: "autocomplete",
				data: "type",
				source: ['client', 'fournisseur', 'commercial'],
				strict: false,
			}, 
      {
        title: "Nom",
				data: "nom",
      }, 
      {
        title: "Tel",
				data: "tel",
      },
      {
        title: "Adresse",
				data: "adresse",
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
        data={contactsState} 
        settings={settings}
        licenseKey='non-commercial-and-evaluation'
      />
  );
}