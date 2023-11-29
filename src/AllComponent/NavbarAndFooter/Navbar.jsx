import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const {user, logOut}= useContext(AuthContext)


  const handleLogOut = () =>{
    logOut().then(()=>{
      // sign out successful
    }).catch(()=>{
      // An error Happend
    })

  }

  return (
    <div className="navbar bg-black max-w-screen-lg fixed z-20 text-white bg-opacity-25">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
            <NavLink to='/'>  Home</NavLink>
            </li>
            <li>
              <NavLink to='/petListing'>  Pet Listing</NavLink>
            </li>
            <li>
              <NavLink to='/donation'> Donation Campaigns</NavLink>
            </li>

            
            
          </ul>
        </div>
        <img className="w-16" src="https://i.ibb.co/w6gZLS5/pet-shop-logo-design-template-modern-animal-icon-label-for-store-veterinary-clinic-hospital-shelter.png" alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">

            <li>
            <NavLink to='/'>  Home</NavLink>
            </li>
            <li>
              <NavLink to='/petListing'>  Pet Listing</NavLink>
            </li>
            <li>
              <NavLink to='/donation'> Donation Campaigns</NavLink>
            </li>
        </ul>
      </div>

      



      <div className="navbar-end">
      {
            user? <>

                  <li tabIndex={0}>
                     <details>
                                <summary>
                                  <div className="avatar online mr-2">
                                    <div className="w-9 rounded-full">
                                      <img src={user.photoURL} />
                                    </div>
                                  </div>
                                </summary>
                                <ul className="p-2 bg-black rounded-lg">
                                  <li className="bg-slate-600 rounded-lg p-1 mb-2">
                                     <NavLink to={'/dashboard'}>Dashboard</NavLink>
                                  </li>
                                  <li>
                                      <NavLink to={'/'}><a onClick={handleLogOut} className="btn btn-xs bg-white text-red-600">Sign out</a></NavLink>
                                  </li>
                                </ul>
                              </details>
                            </li>
            </>
            : <NavLink to={'/login'}><a className="btn text-white">Login/Registration</a></NavLink>
          }
        
      </div>
    </div>
  );
};

export default Navbar;
