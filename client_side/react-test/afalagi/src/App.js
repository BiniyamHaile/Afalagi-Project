import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Entry from "./pages/Entry";
import Companyhome from "./pages/Companyhome";
import Logincontainer from "./pages/Logincontainer";
import Signupcontainer from "./pages/Signupcontainer";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import LoginReuse from "./pages/LoginReuse";

export default  function App() {
 
  return (

    
    



    <BrowserRouter>

<Routes>
  <Route element = {<Entry/>} path = "/" exact />
  <Route element = {<LoginReuse/>}  path = "/login"  exact  />
  <Route element = {<Signupcontainer/>} path = "/signup"  exact />
  <Route element = {<ProtectedRoutes />}>
  <Route element = {<Companyhome/>} path = "/chome/*"/>
  <Route element = {<Home/>} path = "/freelancer/*" />
 </Route>
</Routes>
</BrowserRouter>



    
  
  );
}
