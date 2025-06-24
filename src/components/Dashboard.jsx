import { Link } from "react-router-dom";
import Previous from "./Previous";
import Interviews from "./Interviews";
import Button from '@mui/material/Button'
function Dashboard(){
    return(
        <div>
            This is dashboard
            <Interviews/>
            <Link to = '/dashboard/setup'><Button>Start Interview</Button></Link> 
            <Previous/>
        </div>
    )
}
export default Dashboard