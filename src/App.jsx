import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Home from "./components/Home";
function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App