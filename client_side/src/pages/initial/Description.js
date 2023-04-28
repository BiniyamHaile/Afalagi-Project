
import "../../styles/initial/header.css"
export default function Description(){

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
     
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return( 
     
      <div >
    <div className="description" styles={  "font-family: 'Open Sans', sans-serif;"} >
            
            
<div>
<h1 className="description">Meet your Business Partner Easily!</h1>

 
<div className = "list m-4">
<h4><i className="bi bi-patch-check-fill"></i> Professionals around the globe...</h4>


<h4><i className="bi bi-patch-check-fill"></i> Based on mutual agreement...</h4>

<h4><i className="bi bi-patch-check-fill"></i> Easy to use...</h4>
<div className = "d-flex justify-content-around">
<button onClick={()=>handleClickScroll('about')} className="btn btn-link text-light d-inline d-md-none">ABOUT US</button>
<button onClick={()=>handleClickScroll('footer')}  className= "btn btn-link text-light d-inline d-md-none">CONTACT US</button>
</div>

</div>
  
 

</div>
   
 
  </div>
</div>


    )
}