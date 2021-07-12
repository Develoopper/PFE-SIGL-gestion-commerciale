import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { frFR } from '@material-ui/core/locale';
import 'handsontable/dist/handsontable.full.css';
import "handsontable/languages/fr-FR";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";

export const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
    primary: { main: '#246240' },
    secondary: { main: '#246240e8' }
  },
}, frFR);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hYmlsIiwiaWF0IjoxNjA2NzUxMjg4fQ.XwIkEH_SznW7EoZPxLg3PY8PmOF0WQMtvr6BpcMGSSk