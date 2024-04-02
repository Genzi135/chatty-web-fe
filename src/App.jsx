// App.js
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AuthPage from './page/authentication/AuthPage';
import GettingStarted from './page/gettingStarted/GettingStarted';
import DashBoard from './page/dashboard/Dashboard';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './hooks/redux/store';
import React from 'react';
import axios from 'axios';
import { BASE_URL } from './data/DUMMY_DATA';
import { setLogOut, setLogin, setUser } from './hooks/redux/reducer';
import Main from './page/dashboard/main/Main';

function App() {

  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
      {/* <Routes>
          <Route path='/' element={<GettingStarted />} />
          <Route path='/authentication' element={<AuthPage />} />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes> */}
      {/* {isLogin ? (
        <Provider store={store}>
          <DashBoard />
        </Provider>) : (
        <Provider store={store}>
          <AuthPage />

        </Provider>
      )} */}

    </>
  );
}

export default App;
