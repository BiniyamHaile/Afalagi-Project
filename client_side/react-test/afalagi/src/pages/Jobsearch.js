import { Components } from "./Newsfeed"

export default function Jobsearch({jobs}){
    return(
       <div>
        <h1 className="text-success"> {jobs.length} results found! </h1>
      
        <Components jobs = {jobs} />
        
       </div>
    )
}