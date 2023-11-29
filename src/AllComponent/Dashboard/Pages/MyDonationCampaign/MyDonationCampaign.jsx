import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useDonationCampaign from "../../../../Hooks/useDonationCampaign";
import useAdmin from "../../../../Hooks/useAdmin";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import usePayment from "../../../../Hooks/usePayment";

const MyDonationCampaign = () => {
    const { user } = useContext(AuthContext);
    const [isadmin] = useAdmin();
    const [donationCampaign, refetch] = useDonationCampaign();
    const filteredData = donationCampaign.filter((campaign) => campaign.userEmail === user.email)
    const axiosSecure = useAxiosSecure();
    const [payment] = usePayment();


    const pauseDonation = async (campaign) => {
        const updateADoptedStatus = {
          name: campaign.name,
          image: campaign.image,
          maxDonationAmount: campaign.maxDonationAmount,
          lastDateOfDonation: campaign.lastDateOfDonation,
          donated: true,
          srDescription: campaign.srDescription,
          lgDescription: campaign.lgDescription,
          userEmail: campaign.userEmail,
          createdAt: campaign.createdAt,
        };
      
        try {
          const petRes = await axiosSecure.patch(`/donationCampaign/${campaign._id}`, updateADoptedStatus);
      
          if (petRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Adopted Status Change`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          // Handle error, e.g., show an error message
          console.error("Error updating adoption status:", error);
        }
      };

      



    return (
        <div className=" p-4">
            <h2 className="text-3xl underline text-center">My Donation Campaigns</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Maximum Donation Amount</th>
                        <th>Donation Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((campaign) => (
                        <tr key={campaign.id}>
                            <td>{campaign.name}</td>
                            <td>${campaign.maxDonationAmount}</td>
                            <td>
                                {/* Assuming you have a function to calculate the progress percentage */}
                                <progress value={campaign.currentDonation} max={campaign.maxDonationAmount}></progress>
                                {Math.round((campaign.currentDonation / campaign.maxDonationAmount) * 100)}%
                            </td>
                            {isadmin?
                                <div><button className="btn btn-xs mb-2 lg :mr-2">Delete</button>
                                <Link to={`/dashboard/editDonationCampaigns/${campaign._id}`}>
                                        <button className="btn btn-xs mb-2 lg :mr-2">Edit</button>
                                </Link>
                                <button className="btn btn-xs mb-2">Pause</button>
                                
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Donators</button>
                                    <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                    {
                                    payment.map((item) => (
                                        <div key={item.userEmail}>
                                        <div>Donateros Email :{item.userEmail}</div>
                                        <div>Donate amount: {item.donatedAmount}</div>
                                        </div>
                                    ))
                                    }
                                        <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                        </div>
                                    </div>
                                    </dialog>
                                </div>
                                


                                :
                                <div>
                                    <Link to={`/dashboard/editDonationCampaigns/${campaign._id}`}>
                                        <button className="btn btn-xs mb-2 lg :mr-2">Edit</button>
                                    </Link>
                                    <button
                                        onClick={()=> pauseDonation(campaign)}
                                         className="btn btn-xs mb-2 lg :mr-2">Pause
                                     </button>




                                     {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Donators</button>
                                    <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Hello!</h3>
                                        <p className="py-4">Press ESC key or click the button below to close</p>
                                        <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                        </div>
                                    </div>
                                    </dialog>
                                </div>

                                
                                



                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDonationCampaign;