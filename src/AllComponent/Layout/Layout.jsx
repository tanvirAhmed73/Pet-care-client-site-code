import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../NavbarAndFooter/Navbar";
import Footer from "../NavbarAndFooter/Footer";

const Layout = () => {

    const location = useLocation();
    const noHeaderAndFooter = location.pathname.includes('login') || location.pathname.includes('signUp')



    return (
        <div>
            {
                noHeaderAndFooter || <Navbar></Navbar>
            }
            <Outlet></Outlet>
            {
                noHeaderAndFooter || <Footer></Footer>
            }
            
        </div>
    );
};

export default Layout;