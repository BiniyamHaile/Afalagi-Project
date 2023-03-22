import  "../../styles/initial/joblists.css"
export function Joblists(){
    return(
        <div className = "aliceblue shadow-lg mb-2 container-fluid p-5">
       <div className = "alice-items row ">
            <div  className="mt-md-5 col-12 col-md-6 col-lg-3 " ><h4 className="text-center text-md-start"><i className="bi bi-code-square"></i> Software Development</h4>  </div>
            <div  className="mt-md-5 col-12 col-md-6 col-lg-3"> <h4 className="text-center text-md-start"> <i className="bi bi-activity"></i>Health</h4>  </div>
            <div  className="mt-md-5 col-12 col-md-6 col-lg-3">  <h4 className="text-center text-md-start"><i className="bi bi-camera-reels"></i> Video Editing</h4>  </div>
            <div  className="mt-md-5  col-12 col-md-6 col-lg-3">  <h4 className="text-center text-md-start"> <i className="bi bi-bank"></i> Accounting and Finance</h4>  </div>
            <div  className="mt-md-5  col-12 col-md-6 col-lg-3">  <h4 className="text-center text-md-start"><i className="bi bi-house-heart-fill"></i> Education</h4>  </div>
            <div  className="mt-md-5  col-12 col-md-6 col-lg-3">  <h4 className="text-center text-md-start"> <i className="bi bi-stack"></i> Graphics Design</h4>  </div>
            <div  className="mt-md-5  col-12 col-md-6 col-lg-3">  <h4 className="text-center text-md-start"><i className="bi bi-bag-fill"></i> Market Research</h4>  </div>
            <div  className="mt-md-5  col-12 col-md-6 col-lg-3" >  <h4 className="text-center text-md-start"><i className="bi bi-book"></i> Law</h4>  </div>
       </div>
        </div>
    )
}
