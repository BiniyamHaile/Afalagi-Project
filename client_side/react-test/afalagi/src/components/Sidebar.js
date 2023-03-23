import "../styles/components/sidebar.css"
import { Link } from "react-router-dom"
import { httpGetRequest } from "../requests/Requests"

export default function Sidebar({setJobs}){
        return(
            <>
            
            <h3>Filter</h3>
              <Accordion setJobs={setJobs}/>
            
            </>

        )
}

function Accordion({setJobs}){
      const hadleClick = async (department)=>{
        const result = await httpGetRequest(`/job/department/${department}`)
        console.log(result)
        setJobs(result)
      }
    return(
      <>
      

  <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Department
      </button>
    </h2>


    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      
      
      <div className="accordion-body">
        <ul>
          <li className="list-unstyled" onClick = {()=>{hadleClick("IT")}}>IT</li>
          <li className="list-unstyled" onClick = {()=>{hadleClick("Law")}}>Law</li>
          <li className="list-unstyled" onClick = {()=>{hadleClick("Health")}}>Health</li>
          <li className="list-unstyled" onClick = {()=>{hadleClick("Graphics")}}>Graphics</li>
          <li className="list-unstyled" onClick = {()=>{hadleClick("Psychology")}}>Psychology</li>
        </ul>
      </div>
   
   
    </div>
  </div>







    {/*
    
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Sort By : 
      </button>
    </h2>

    
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
       
       <ul className="list-unstyled" >
        <li> Date Posted </li>
        <li> Relevance </li>
       </ul>
       
      </div>
    </div> */}
  </div>






      </>
    )

}



export function SmallFilter(){
    return(
      <>
          <div>
            <h3> Filter </h3>
          <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Choose Department
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

    <li><a class="dropdown-item" href="#">IT</a></li>
    <li><a class="dropdown-item" href="#">Law</a></li>
    <li><a class="dropdown-item" href="#">Health</a></li>
    <li><a class="dropdown-item" href="#">Software</a></li>
    <li><a class="dropdown-item" href="#">Graphics</a></li>
    <li><a class="dropdown-item" href="#">Psychology</a></li>
  </ul>
</div>
          </div>
      </>
    )
}