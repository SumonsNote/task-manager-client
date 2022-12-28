import React, { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashBoardPage from './pages/DashBoardPage';
import CancelPage from './pages/CancelPage';
import CompletePage from './pages/CompletePage';
import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';
import RegistrationPage from './pages/RegistrationPage';
import CreatePage from './pages/CreatePage'
import FullScreenLoader from './components/masterLayout/FullScreenLoader';
import { getToken } from './helpers/SessionHelper';
import SendOTP from './components/AccountRecovery/SendOTP';
import VerifyOTP from './components/AccountRecovery/VerifyOTP';
import CreatePassword from './components/AccountRecovery/CreatePassword';

const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<DashBoardPage />} />
            <Route exact path='/cancel' element={<CancelPage />} />
            <Route exact path='/complete' element={<CompletePage />} />
            <Route exact path='/create' element={<CreatePage />} />
            <Route exact path='/all' element={<NewPage />} />
            <Route exact path='/profile' element={<ProfilePage />} />
            <Route exact path='/progress' element={<ProgressPage />} />
            <Route exact path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    )
  }
  else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>

            <Route exact path='/' element={<Navigate to='/login' replace/>} />
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/registration' element={<RegistrationPage />} />

            <Route exact path='/SendOTP' element={<SendOTP/>} />
            <Route exact path='/VerifyOTP' element={<VerifyOTP/>} />
            <Route exact path='/CreatePassword' element={<CreatePassword/>} />

            <Route exact path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    )
  }
};

export default App;