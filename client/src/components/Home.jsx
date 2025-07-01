import { Link } from "react-router-dom"
import SignUp from "./Auth/SignUp"
import SignIn from "./Auth/SignIn"
import Layout from "./Layout/Layout"
function Home(){
  return(
    <div>
        <Layout>
            <div className="flex gap-10">
            <Link to='/sign-up' element={<SignUp/>}><button> Go to Sign Up </button></Link>
            <Link to='/sign-in' element={<SignIn/>}><button> Go to Sign In </button></Link>
            </div>
        </Layout>
    </div>
  )
}
export default Home