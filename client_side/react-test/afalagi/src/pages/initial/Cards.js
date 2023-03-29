import "../../styles/initial/header.css"
import img_1 from "../../images/myproject.jpg"
import company_1 from "../../images/company-1.jpg"
import company_2 from "../../images/company-2.png"


export default function Cards(){
 
    
    return(

      <div className = "cards">


        <div className="row  container" >



        <div className="card col-md-5 ms-md-1 ms-lg-3 me-5" styles={"width: 18rem;"} >
  <img src= {company_1} className="card-img-top " alt="..." styles={"height : 50px"}/>
  <div className="card-body">
    <h2 className="card-title  text-center"  >JS Tech Group</h2>
    <p className="card-text fs-5">"We love the freelancing website! It's easy to use, and the customer service is top-notch. We've been able to find great freelancers quickly and easily, and the rates are very competitive. Highly recommend!"</p>
    <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
  </div>
</div>

  

<div className="card employee  col-md-5 ms-md-1  ms-lg-3 me-5" styles={"width: 18rem;"}>
  <img src= {img_1} className="card-img-top " alt="..." />
  <div className="card-body">
    <h2 className="card-title text-center">Yonas Behailu</h2>
    <p className="card-text fs-5">"I've been using the freelancing website for a few months now and I'm really impressed. The platform is easy to use and the customer service is great. I've been able to find plenty of work and the rates are very competitive. Highly recommend!"</p>
    <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
  </div>
</div>



  








        </div>
        







        </div>
    )


}