import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Signup from './Auth/SignUp';
import Login from './Auth/Login';
import Index from './Landing/Index';
import AddEvent from './Landing/AddEvent';
import AboutUs from './Landing/AboutUs';
import PrivacyPolicy from './Landing/PrivacyPolicy';
import Logout from './Landing/Logout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'dashboard',
    element: <Index />,
  },
  {
    path: 'add-event',
    element: <AddEvent />,
  },
  {
    path: 'edit-event/:id',
    element: <AddEvent />,
  },
  {
    path: 'about-us',
    element: <AboutUs />,
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: 'logout',
    element: <Logout />,
  }
  
]);

export default router;
