import { Link } from "react-router-dom";
import "../styles/footer.css";
export default function Footer(){
    return(
        <div class = 'footer-container container-fluid shadow  row p-5 '>
            <div className=" ms-auto  col-3 text-lg fs-4 "> <i class=" bi bi-facebook "></i> <Link to = "" >  Afalagi </Link> </div>
            <div className=" ms-auto col-3 text-lg fs-4 "> <i class = "bi bi-twitter"></i> <Link to = "" > Afalagi twittes </Link> </div>
            <div className=" ms-auto col-3 text-lg fs-4 ">  <i class=" bi bi-linkedin " ></i> <Link to = ""> Afalagi Jobs </Link>  </div>

        </div>
    )
}