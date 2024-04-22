import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/Login'   ;
import SignUpPage from './Pages/Signup';
import PrivateRoutes from './Pages/';
import UserContext from './context/UserContext';
import Template from './Components/Template';

type RoutesMethodsType = {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

const ProtectedRoute = ({ isAuthenticated, children } : RoutesMethodsType) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
const UnauthenticatedRoute = ({ isAuthenticated, children } : RoutesMethodsType) => {
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default function AppRoutes() {
    console.log(UserContext)
    const { isAuthenticated } = useContext(UserContext);
    return (
      <Routes>
          <Route path="/login" element={<UnauthenticatedRoute isAuthenticated={isAuthenticated} children={<LoginPage />} />}/>
          <Route  path="/signup" element={<UnauthenticatedRoute isAuthenticated={isAuthenticated} children={<SignUpPage />} />}/>
          <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} children={<Template />} />} >
            {PrivateRoutes.map((PrivateRoute) => (PrivateRoute))}
          </Route>

      </Routes>

    );
}