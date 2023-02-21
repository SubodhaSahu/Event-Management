import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Signup from './Auth/SignUp';
import Logout from './Landing/Logout';

// Lazy Loading Route
const Login = lazy(() => import('./Auth/Login'));
const Index = lazy(() => import('./Landing/Index'));
const AddEvent = lazy(() => import('./Landing/AddEvent'));
const AboutUs = lazy(() => import('./Landing/AboutUs'));
const PrivacyPolicy = lazy(() => import('./Landing/PrivacyPolicy'));

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
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    )
  },
  {
    path: 'dashboard',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Index />
      </Suspense>
    )
  },
  {
    path: 'add-event',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AddEvent />
      </Suspense>
    )
  },
  {
    path: 'edit-event/:id',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AddEvent />
      </Suspense>
    )
  },
  {
    path: 'about-us',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <AboutUs />
      </Suspense>
    )
  },
  {
    path: 'privacy-policy',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <PrivacyPolicy />
      </Suspense>
    )
  },
  {
    path: 'logout',
    element: <Logout />,
  }
  
]);

export default router;
