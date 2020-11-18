import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import App from './containers/App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import styles from './index.css'
import {BrowserRouter} from 'react-router-dom'
import rootReducer from './store/reducers'
import FormAcc from './formacc.js'

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

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
// const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <FormAcc/>
      </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
