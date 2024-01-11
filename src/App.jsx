// App.js
import { Routes, Route } from 'react-router-dom';

import './App.css';
import AuthPage from './page/authentication/AuthPage';
import GettingStarted from './page/GettingStarted';
import DashBoard from './page/dashboard/Dashboard';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<GettingStarted />} />
        <Route path='/authentication' element={<AuthPage />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
