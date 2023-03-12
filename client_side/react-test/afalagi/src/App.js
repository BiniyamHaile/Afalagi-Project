import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import Companyhome from "./pages/Companyhome";

import Signupcontainer from "./pages/Signupcontainer";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Login from "./pages/Login";

export default  function App() {
 
  return (

    
    



    <BrowserRouter>

<Routes>
  <Route element = {<Entry/>} path = "/" exact />
  <Route element = {<Login/>}  path = "/login"  exact  />
  <Route element = {<Signupcontainer/>} path = "/signup"  exact />
  <Route element = {<ProtectedRoutes />}>
  <Route element = {<Companyhome/>} path = "/chome/*"/>
  <Route element = {<Home/>} path = "/freelancer/*" />
 </Route>
</Routes>
</BrowserRouter>



    
  
  );
}
