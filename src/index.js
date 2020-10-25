import React from 'react'
import ReactDOM from 'react-dom'
import AppLayout from './containers/AppLayout/AppLayout'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import styles from './index.css'
import {BrowserRouter} from 'react-router-dom'
const theme = createMuiTheme({
  palette: {
    primary: {
      //main: '#FAFAFA',
      main: 'rgba(25, 181, 254, 1)',
    },
    secondary: {
      main: '#F02849',
    },
  },
  typography: {
    h6: {
      
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
