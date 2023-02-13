import { createContext, useState } from 'react';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});

    return (
      // eslint-disable-next-line react/react-in-jsx-scope, react/jsx-no-constructed-context-values
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
}

export default AuthContext;
