import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
function Layout({children}){
    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
export default Layout