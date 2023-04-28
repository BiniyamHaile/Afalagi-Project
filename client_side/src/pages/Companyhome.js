import {Routes  , Route } from "react-router-dom";
import Navbar from "./Navbar";
import Chomepage from "./Chomepage";
import Postjob from "./Postjob";
import Jobsposted from "./Jobsposted";
import Appliedpeople from "./Appliedpeople";

import Freelancersearch from "./Freelancersearch";

export default function Companyhome(){
    return(
        
        <div>
                  <Navbar/>

                    <Routes>
                    <Route path = "/" element = {<Chomepage/>}  exact />
                    <Route path = "/jobsposted" element = {<Jobsposted/>}  exact />
                    <Route path="/postjob" element = {<Postjob />} exact/>
                    <Route path = "/jobsposted/appliedpeople/:jobId" element = {<Appliedpeople />} exact/>
                    <Route path = "/search/:query" element = {<Freelancersearch/>} exact />

                    
                    </Routes>
        </div>

    )
}


