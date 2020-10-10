import React from 'react'
import ReactDOM from 'react-dom'
import AppLayout from './containers/AppLayout/AppLayout'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

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
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppLayout />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
