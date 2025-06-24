import { Link } from "react-router-dom";
import Previous from "./Previous";
import Interviews from "./Interviews";

function Dashboard(){
    return(
        <div>
            This is dashboard
            <Interviews/>
            <Link to = '/dashboard/setup'><button>Start Interview</button></Link> 
            <Previous/>
        </div>
    )
}
export default Dashboard