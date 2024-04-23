import React from "react";
import Home from "./Home/Home.tsx";
import Bookmarkers from "./Home/Bookmarkers.tsx";
import {PortfolioForm, Portfolios} from "./Portfolio";
import Portfolio from "./Portfolio/Portfolio.tsx";
import Profile from "./Home/Profile.tsx";


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
