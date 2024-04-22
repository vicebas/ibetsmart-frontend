import React from "react";
import Home from "./Home/Home.tsx";
import Bookmarkers from "./Home/Bookmarkers.tsx";
import {Route} from "react-router-dom";
import Profile from "./Home/Profile.tsx";
import {PortfolioForm, Portfolios} from "./Portfolio";
import Portfolio from "./Portfolio/Portfolio.tsx";


type privateRoutesType = {
     path: string;
    element: React.ReactNode;
}

export const privateRoutesArray: privateRoutesType[] = [
  { path: '' , element: <Home/>},
  { path: 'bookmarkers' , element: <Bookmarkers/>},
  { path: 'portfolios', element: <Portfolios/>},
  { path: 'portfolios/new', element: <PortfolioForm/>},
    {path: 'portfolios/:id', element: <Portfolio/>},
  {path: 'profile', element: <Profile/>},
]

const PrivateRoutes: React.ReactNode[] = privateRoutesArray.map((route) => (
  <Route key={route.path} path={route.path} element={route.element} />
))
export default PrivateRoutes