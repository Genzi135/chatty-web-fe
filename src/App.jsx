// App.js
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AuthPage from './page/authentication/AuthPage';
import GettingStarted from './page/gettingStarted/GettingStarted';
import DashBoard from './page/dashboard/Dashboard';
import { Provider } from 'react-redux';
import store from './hooks/redux/store';

function App() {


  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<GettingStarted />} />
          <Route path='/authentication' element={<AuthPage />} />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
