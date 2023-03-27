import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
  children: ReactElement;
  allowedRoles: string;
};

function RequireAuth({ children, allowedRoles }: Props) {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useAuth();
  const roleAccess = allowedRoles?.includes(userInfo.role);

  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       navigate('/login');
  //     }
  //   }, [isLoggedIn]);

  if (isLoggedIn === true && roleAccess === true) {
    return children;
  }
}

export default RequireAuth;
