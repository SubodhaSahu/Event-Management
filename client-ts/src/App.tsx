import { RouterProvider } from 'react-router-dom';
import router from './RouteConfig';
import { AuthContextProvider } from './store/AuthContext';
// import Header from './components/Auth/Layout/Header';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
