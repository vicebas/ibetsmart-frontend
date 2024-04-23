import React from "react";
import {Route} from "react-router-dom";
import {privateRoutesArray} from "./routes.tsx";



const PrivateRoutes: React.ReactNode[] = privateRoutesArray.map((route) => (
  <Route key={route.path} path={route.path} element={route.element} />
))
export default PrivateRoutes