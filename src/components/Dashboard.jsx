import { Link } from "react-router-dom";
import Previous from "./Previous";
import Interviews from "./Interviews";
import Button from '@mui/material/Button'
function Dashboard(){
    return(
        <div>
            This is dashboard
            <Interviews/>

            <Previous/>
        </div>
    )
}
export default Dashboard