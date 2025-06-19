import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import Home from "./components/Home";
import Setup from "./components/Setup";
import Dashboard from "./components/Dashboard";
function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/setup" element={<Setup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App