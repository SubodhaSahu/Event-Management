import useAuth from '../hooks/useAuth';

function RequireAuth({ children, allowedRoles }) {
    const { isLoggedIn, userInfo } = useAuth();
    const roleAccess = allowedRoles?.includes(userInfo?.role);
    
    if (isLoggedIn === true && roleAccess === true) {
        return children;
  } 
  // Todo ::: Navigate/redirect ir not working. Need to check it
 //  <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
