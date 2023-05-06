import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store/store';
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App;