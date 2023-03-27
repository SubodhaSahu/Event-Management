import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Signup from './components/Auth/Signup';
import ErrorPage from './components/Pages/ErrorPage';
import Header from './components/Auth/Layout/Header';
import RequireAuth from './utility/RequireAuth';

// Lazy Loading Route
const Login = lazy(() => import('./components/Auth/Login'));
const Events = lazy(() => import('./components/Events/EventListing'));
const CreateEvent = lazy(() => import('./components/Events/CreateEvent'));
const Venues = lazy(() => import('./components/Venues/index'));
const CreateVenues = lazy(() => import('./components/Venues/createVenue'));
const AboutUs = lazy(() => import('./components/Pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('./components/Pages/PrivacyPolicy'));

const ROLES = ['User', 'Admin'];
const { suspenseFallbackEle } = '<p>Loading...</p>';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Header>
        <Suspense fallback={suspenseFallbackEle}>
          <Signup />
        </Suspense>
      </Header>
    ),
  },
  {
    path: 'signup',
    element: (
      <Header>
        <Suspense fallback={suspenseFallbackEle}>
          <Signup />
        </Suspense>
      </Header>
    ),
  },
  {
    path: 'login',
    element: (
      <Header>
        <Suspense fallback={suspenseFallbackEle}>
          <Login />
        </Suspense>
      </Header>
    ),
  },
  {
    path: 'dashboard',
    element: (
      <RequireAuth redirectTo="/login" allowedRoles={ROLES}>
        <Suspense fallback={suspenseFallbackEle}>
          <Events />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: 'center-by-event/:venueId',
    element: (
      <Suspense fallback={suspenseFallbackEle}>
        <RequireAuth redirectTo="/login" allowedRoles={ROLES}>
          <Events />
        </RequireAuth>
      </Suspense>
    ),
  },
  {
    path: 'add-event',
    element: (
      <RequireAuth redirectTo="/login" allowedRoles={ROLES}>
        <Suspense fallback={suspenseFallbackEle}>
          <CreateEvent />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: 'edit-event/:id',
    element: (
      <RequireAuth redirectTo="/login" allowedRoles={ROLES}>
        <Suspense fallback={suspenseFallbackEle}>
          <CreateEvent />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: 'venues',
    element: (
      <RequireAuth redirectTo="/login" allowedRoles={[ROLES[1]]}>
        <Suspense fallback={suspenseFallbackEle}>
          <Venues />
        </Suspense>
      </RequireAuth>
    ),
  },
  {
    path: 'add-venue',
    element: (
      <RequireAuth redirectTo="/login" allowedRoles={[ROLES[1]]}>
        <Suspense fallback={suspenseFallbackEle}>
          <CreateVenues />
        </Suspense>
      </RequireAuth>
    ),
  },
  // {
  //   path: 'edit-venue/:id',
  //   element: (
  //     <RequireAuth redirectTo="/login" allowedRoles={[ROLES[1]]}>
  //       <Suspense fallback={suspenseFallbackEle}>
  //         <CreateVenues />
  //       </Suspense>
  //     </RequireAuth>
  //   ),
  // },
  {
    path: 'about-us',
    element: (
      // <RequireAuth redirectTo="/login" allowedRoles={ROLES}>
      <Suspense fallback={suspenseFallbackEle}>
        <AboutUs />
      </Suspense>
      // </RequireAuth>
    ),
  },
  {
    path: 'privacy-policy',
    element: (
      // <RequireAuth redirectTo="/login" allowedRoles={ROLES}>
      <Suspense fallback={suspenseFallbackEle}>
        <PrivacyPolicy />
      </Suspense>
      // </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
