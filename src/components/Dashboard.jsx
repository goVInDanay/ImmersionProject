import { Link } from "react-router-dom";
import Previous from "./Previous";

function Dashboard(){
    return(
        <div>
            This is dashboard
            <Link to = '/dashboard/setup'><button>Start Interview</button></Link> 
            <Previous/>
        </div>
    )
}
export default Dashboard