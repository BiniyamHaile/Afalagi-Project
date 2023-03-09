import "../styles/components/sidebar.css"
import { Link } from "react-router-dom"
export default function Sidebar(){
        return(
            <>
            
            <h3>Fileter</h3>
              <Accordion/>
            
            </>

        )
}

function Accordion(){

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
          <li className="list-unstyled"><Link to = "">IT</Link></li>
          <li className="list-unstyled"><Link to = "">Law</Link></li>
          <li className="list-unstyled"><Link to = "">Health</Link></li>
          <li className="list-unstyled"><Link to = "">Software</Link></li>
          <li className="list-unstyled"><Link to = "">Graphics</Link></li>
          <li className="list-unstyled"><Link to = "">Psychology</Link></li>
        </ul>
      </div>
   
   
    </div>
  </div>






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
    </div>
  </div>





</div>
      </>
    )

}