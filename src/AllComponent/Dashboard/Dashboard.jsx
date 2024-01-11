import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
    const [isadmin] = useAdmin();
    return (
        <div className="flex justify-between ">
            {/* dashboard sidebar */}
            <div className="w-[130px]  lg:w-64 md:min-h-screen bg-gray-600">
                <ul className="menu p-4">
                    {
                    isadmin?
                        <div>
                            <li className="mb-2"><NavLink to={'/dashboard/users'}>Users</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/AllPets'}>All Pets</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/allDonation'}>All Donations</NavLink></li>
                            


                            <li className="mb-2"><NavLink to={'/dashboard/AddAPet'}>Add a pet</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/myAddedPet'}>My added pets</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/adoptionRequest'}>Adoption Request</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/createDonation'}>Create Donation Campaign</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/myDonationCampaigns'}>My Donation Campaigns</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/myDonation'}>My Donations</NavLink></li>
                        </div>
                        :
                        <div>
                            <li className="mb-2"><NavLink to={'/dashboard/AddAPet'}>Add a pet</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/myAddedPet'}>My added pets</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/adoptionRequest'}>Adoption Request</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/createDonation'}>Create Donation Campaign</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/myDonationCampaigns'}>My Donation Campaigns</NavLink></li>
                            <li className="mb-2"><NavLink to={'/dashboard/myDonation'}>My Donations</NavLink></li>
                        </div>
                    }
                    
                    
                    <div className="divider"></div>
                    <li className="mb-2"><NavLink to={'/'}>Home</NavLink></li>
                    <li className="mb-2"><NavLink to={'/petListing'}>Pet Listing</NavLink></li>
                    <li className="mb-2"><NavLink to={'/donation'}>Donation Campaign</NavLink></li>
                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet> 
            </div>
        </div>
    );
};

export default Dashboard;