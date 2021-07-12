import { combineReducers } from "redux";
import caisseReducer from "./caisseReducer";
import standardReducer from "./standardReducer";

const rootReducer = combineReducers({
	caisseState: caisseReducer,
	transfertsState: standardReducer([], 'transferts'),
	ventesState: standardReducer([], 'ventes'),
	achatsState: standardReducer([], 'achats'),
	contactsState: standardReducer([], 'contacts'),
	usersState: standardReducer([], 'users'),
	
	currentTableState: standardReducer(null, 'currentTable'),
	
	userState: standardReducer('', 'user'),
	loadingState: standardReducer(true, 'loading'),
	snackState: standardReducer({ type: "", msg: "", open: false }, 'snack'),
	savedState: standardReducer({ caisse: true, ventes: true, achats: true, contacts: true }, 'saved'),
});

export default rootReducer;