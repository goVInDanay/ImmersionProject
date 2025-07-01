import { Link } from "react-router-dom";
import Previous from "./Previous";
import Interviews from "./Interviews";
import Layout from './Layout/Layout'
import Button from '@mui/material/Button'
function Dashboard(){
    return(
        <Layout>
            <Interviews/>
            <Previous/>
        </Layout>
    )
}
export default Dashboard