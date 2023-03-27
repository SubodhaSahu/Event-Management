/* eslint-disable react/function-component-definition */
import {
  useState,
  createContext,
  useMemo,
  useEffect,
  ReactNode,
  Context,
} from 'react';

interface userInfoType {
  role: 'Admin' | 'User';
  name: string;
  email: string;
  token?: string;
  refreshToken?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userInfo: userInfoType;
  onLoginSetAuth: (userDetail: string) => void;
  onLogout: () => void;
}

const initialState: AuthContextType = {
  isLoggedIn: false,
  onLoginSetAuth: () => undefined,
  userInfo: { name: '', email: '', role: 'User' },
  onLogout: () => undefined,
};

const AuthContext: Context<AuthContextType> =
  createContext<AuthContextType>(initialState);

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = (
  props: AuthProviderProps
) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: '',
    email: '',
    role: 'User',
  });

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);

      const storedUserInfo = localStorage.getItem('userInfo');
      const userInfoJson = JSON.parse(storedUserInfo || '{}');
      setUserInfo({ ...userInfoJson });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
  };

  const loginHandler = (userDetail: string) => {
    const userInfoJson = JSON.parse(userDetail);
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('userInfo', userDetail);
    setUserInfo({ ...userInfoJson });
    setIsLoggedIn(true);
  };

  const authContext: AuthContextType = useMemo(
    () => ({
      isLoggedIn,
      userInfo,
      onLogout: logoutHandler,
      onLoginSetAuth: loginHandler,
    }),
    [isLoggedIn, userInfo]
  );
  const { children } = props;

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
