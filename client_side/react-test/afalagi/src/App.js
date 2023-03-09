import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import Companyhome from "./pages/Companyhome";
import Logincontainer from "./pages/Logincontainer";
import Signupcontainer from "./pages/Signupcontainer";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default  function App() {
 
  return (

    
    



    <BrowserRouter>

<Routes>
  <Route element = {<Entry/>} path = "/home" exact />
  <Route element = {<Logincontainer/>}  path = "/login"  exact  />
  <Route element = {<Signupcontainer/>} path = "/signup"  exact />
  <Route element = {<Companyhome/>} path = "/chome/*"/>
  <Route element = {<Home/>} path = "/freelancer/*" />
  <Route element = {<ProtectedRoutes />}>
 </Route>
</Routes>
</BrowserRouter>



    
  
  );
}
