import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './store/AuthContext';
import router from './RouteConfig';

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} /> 
    </AuthContextProvider>
  );
}

export default App;
