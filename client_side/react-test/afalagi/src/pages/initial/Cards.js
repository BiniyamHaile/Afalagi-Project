import "../../styles/initial/header.css"
import img_1 from "../../images/myproject.jpg"
import company_1 from "../../images/company-1.jpg"
import company_2 from "../../images/company-2.png"


export default function Cards(){
 
    
    return(

      <div className = "cards">


        <div className="row" >



        <div className="card col-md-4" styles={"width: 18rem;"} >
  <img src= {company_1} className="card-img-top " alt="..." styles={"height : 50px"}/>
  <div className="card-body">
    <h2 className="card-title  text-center"  >JS Tech Group</h2>
    <p className="card-text fs-5">"We love the freelancing website! It's easy to use, and the customer service is top-notch. We've been able to find great freelancers quickly and easily, and the rates are very competitive. Highly recommend!"</p>
    <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
  </div>
</div>

  

<div className="card employee  col-md-4" styles={"width: 18rem;"}>
  <img src= {img_1} className="card-img-top " alt="..." />
  <div className="card-body">
    <h2 className="card-title text-center">Yonas Behailu</h2>
    <p className="card-text fs-5">"I've been using the freelancing website for a few months now and I'm really impressed. The platform is easy to use and the customer service is great. I've been able to find plenty of work and the rates are very competitive. Highly recommend!"</p>
    <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
  </div>
</div>



  


<div className="card  col-md-4" styles={"width: 18rem;"}>
  <img src= {company_2} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h2 className="card-title text-center">Tech.Co</h2>
    <p className="card-text fs-5">"We've been using the freelancing website for a while now and it's been great. The interface is intuitive and the search function is very helpful. We've been able to find the right freelancers for our projects quickly and easily. Thank you!"</p>
    <div><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></div>
  </div>
</div>





        </div>
        







        </div>
    )


}