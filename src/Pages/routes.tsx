import React from "react";
import Home,{PortfolioPage} from "./Home";
import Bookmarkers from "./Home/Bookmarkers.tsx";
import {PortfolioForm, Portfolios} from "./Portfolio";
import Portfolio from "./Portfolio/Portfolio.tsx";
import Profile from "./Home/Profile.tsx";
import Game from "./Game/Game.tsx";


type privateRoutesType = {
    path: string;
    element: React.ReactNode;
}

export const privateRoutesArray: privateRoutesType[] = [
    { path: '' , element: <Home/>},
    { path: 'subscribed/:id' , element: <PortfolioPage/>},

    { path: 'bookmarkers' , element: <Bookmarkers/>},
    { path: 'portfolios', element: <Portfolios/>},
    { path: 'portfolios/new', element: <PortfolioForm/>},
    {path: 'portfolios/:id', element: <Portfolio/>},
    {path: 'game/:id', element: <Game/>},
    {path: 'profile', element: <Profile/>},
]
