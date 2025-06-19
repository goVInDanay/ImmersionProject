import { Link } from "react-router-dom"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Layout from "./Layout"
function Home(){
  return(
    <div>
        <Layout>
            <Link to='/sign-up' element={<SignUp/>}><button> Go to Sign Up </button></Link>
            <Link to='/sign-in' element={<SignIn/>}><button> Go to Sign In </button></Link>
        </Layout>
    </div>
  )
}
export default Home