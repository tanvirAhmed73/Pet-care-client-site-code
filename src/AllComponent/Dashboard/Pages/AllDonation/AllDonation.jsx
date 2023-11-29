import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useDonationCampaign from "../../../../Hooks/useDonationCampaign";
import Swal from "sweetalert2";

const AllDonation = () => {
    const [donationCampaign, refetch] = useDonationCampaign();
    
    const axiosSecure = useAxiosSecure();


    const handleDeleteDonation = (item)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/donationCampaign/${item._id}`);
                
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }
    return (
        <div>
            <header className="text-5xl text-center underline">Donation Campaign</header>
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Pet Name</th>
                            <th>Donated Amount</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donationCampaign.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td className="text-right">{item.donatedAmount}</td>
                                <td>
                                    <Link to={`/dashboard/updateDonation/${item._id}`}>
                                        <button
                                            className="btn btn-ghost btn-sm">
                                                Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteDonation(item)}
                                        className="btn btn-ghost btn-sm">
                                            Delete
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    </div>
    );
};

export default AllDonation;