/* eslint-disable no-undef */
import React from 'react';
import { Navigate } from 'react-router-dom';

// useEffect(() => {
//     localStorage.clear();
//       <Navigate to="/login" />;
// }, []);

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

export default Logout;
