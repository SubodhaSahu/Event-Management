import React, {
useState, createContext, useMemo, useEffect 
} from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLoginSetAuth: () => {},
  onLogout: () => {}
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);

      const storedUserInfo = localStorage.getItem('userInfo');
      const userInfoJson = JSON.parse(storedUserInfo);
      setUserInfo({ ...userInfoJson });
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
  };

  const loginHandler = (userDetail) => {
    const userInfoJson = JSON.parse(userDetail);
    localStorage.setItem('isLoggedIn', '1');
    localStorage.setItem('userInfo', userDetail);
    setUserInfo({ ...userInfoJson });
    setIsLoggedIn(true);
  };
    
  const value = useMemo(() => ({
    isLoggedIn,
    userInfo,
    onLogout: logoutHandler,
    onLoginSetAuth: loginHandler
  }), [isLoggedIn]);  
  const { children } = props;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
