import 'dotenv/config';

import React from 'react';
import { Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import history from '~/services/history';

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Routes />
    </Router>
  );
}

export default App;
