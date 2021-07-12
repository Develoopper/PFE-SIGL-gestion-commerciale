import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import { getTodayDate } from "../helpers/myFunctions";

export default function Achats() {
	const loadingState  = useSelector(state => state.loadingState);
	const contactsState = useSelector(state => state.contactsState);
	const achatsState   = useSelector(state => state.achatsState);

	const dispatch = useDispatch();

  const hotTableComponent = useRef(null);
  const [contactsMenu, setContactsMenu] = useState({})

  useEffect(() => {
    if (!loadingState) {
      setContactsMenu({
        fournisseurs: contactsState.filter(x => x[0] === "fournisseur").map(x => x[1]),
        commercials: contactsState.filter(x => x[0] === "commercial").map(x => x[1])
      });
      dispatch({ type: 'currentTable/set', payload: hotTableComponent });
    }
  }, [loadingState]);

  const resteValidator = function (value, callback) {
		callback(false);
	};
	
	function resteRenderer(instance, td, row, col, prop, value, cellProperties) {
		if (Number(value) === NaN)
			return false;

		Handsontable.renderers.TextRenderer.apply(this, arguments);

		if (Number(value) > 0)
			td.style.background = '#5252527c';
		else if (Number(value) < 0)
			td.style.background = '#FF4C42';
	}

  const settings = {
    rowHeaders: true,
    stretchH: "all",
    dropdownMenu: true,
    contextMenu: true,
    filters: true,
    columnSorting: {
			sortEmptyCells: true,
			initialConfig: {
				column: 0,
				sortOrder: 'desc'
			}
		},
    beforeChange(changes) {
			changes.forEach(([row, prop, oldVal, newVal], index) => {
				if (['ca', 'encaisse', 'reste', 'espece', 'cheque', 'tpe', 'virement'].includes(prop)) {
					if (isNaN(Number(newVal))) {
						changes[index] = null;
						return;
					}
				}
			});
		},
		afterChange(changes, source) {
			if (source === 'loadData')
				return

			dispatch({ type: 'saved/update', payload: { ventes: false, caisse: false } });
			
			changes.forEach(([row, prop, oldVal, newVal]) => {
				// if (prop === 'nDeBon')
				// 	hotTableComponent.current.hotInstance.getCell(row, 2).style.background = '#5252527c'

				if (['date', 'commercial', 'fournisseur'].includes(prop)) {
					if (newVal === null) {
						this.setDataAtRowProp(row, prop, '')
						return;
					}
				}

				if (['ca', 'encaisse', 'reste', 'espece', 'cheque', 'tpe', 'virement'].includes(prop)) {
					if (newVal === null || newVal === '') {
						this.setDataAtRowProp(row, prop, 0)
						return;
					}
				}

				if (prop === 'ca')
					if (Number(this.getDataAtRowProp(row, 'reste')) === 0)
						this.setDataAtRowProp(row, 'reste', Number(newVal));
					
				if (['espece', 'cheque', 'tpe', 'virement'].includes(prop)) {
					const ca = this.getDataAtRowProp(row, 'encaisse');
					const encaisse = this.getDataAtRowProp(row, 'reste');

					const dif = Number(newVal) - Number(oldVal);
					if (dif === NaN)
						return false;

					this.setDataAtRowProp(row, 'encaisse', Number(ca) + dif);
					this.setDataAtRowProp(row, 'reste', Number(encaisse) - dif);

					dispatch({ type: 'caisse/sub', payload: { 
						type: prop,
						montant: dif
					} });
				}
			});
		},
		dataSchema: { date: getTodayDate(), commercial: '', nDeBon: '', nDeFacture: '', ca: 0, encaisse: 0, reste: 0, espece: 0, cheque: 0, tpe: 0, virement: 0, fournisseur: '' },
    columns: [
      {
        title: "Date",
        type: 'date',
        data: "date", 
        dateFormat: 'DD/MM/YYYY',
        correctFormat: true,
				allowInvalid: false,
        defaultDate: new Date(),
        datePickerConfig: { firstDay: 1, numberOfMonths: 1 }
      },
      {
        title: "Com", 
        type: 'autocomplete',
        data: "commercial", 
        source: contactsMenu.commercials,
        strict: false, 
        width: 100
      },
      { 
        title: "Bon", 
        type: 'numeric', 
        data: "nDeBon", 
        width: 60 
      },
      { 
        title: "Facture", 
        type: 'numeric', 
        data: "nDeFacture", 
        width: 80 
      },
      { 
        title: "CA", 
        type: 'numeric', 
        data: "ca", 
        numericFormat: { pattern: '0.00' }, 
        width: 80 
      },
      { 
        title: "Encaissé", 
        type: 'numeric', 
        data: "encaisse", 
        numericFormat: { pattern: '0.00' }, 
        width: 100 
      },
      { 
        title: "Reste", 
        type: 'numeric', 
        data: "reste", 
        numericFormat: { pattern: '0.00' }, 
        width: 100 
      },
      { 
        title: "Espèce", 
        type: 'numeric', 
        data: "espece", 
        numericFormat: { pattern: '0.00' }, 
        width: 100 
      },
      { 
        title: "Chèque", 
        type: 'numeric', 
        data: "cheque", 
        numericFormat: { pattern: '0.00' }, 
        width: 100 
      },
      { 
        title: "TPE", 
        type: 'numeric', 
        data: "tpe", 
        numericFormat: { pattern: '0.00' }, 
        width: 100 
      },
      { 
        title: "Virement", 
        type: 'numeric', 
        data: "virement", 
        numericFormat: { pattern: '0.00' }, 
        width: 100 
      },
      {
        title: "Fournisseur", 
        type: 'autocomplete',
        data: "fournisseur", 
        source: contactsMenu.fournisseurs,
        strict: false
      },
    ],
    cells: function (row, col) {
			const cellProperties = {};

			if (col === 6)
				cellProperties.renderer = resteRenderer;

			return cellProperties;
		},
    language: 'fr-FR'
  }
    
  return (
    loadingState ?
      <CircularProgress color="primary" size={150} thickness={2}/> 
    : 
      <HotTable 
        ref={hotTableComponent}
        data={achatsState} 
        settings={settings}
        licenseKey='non-commercial-and-evaluation'
      />
  );
}