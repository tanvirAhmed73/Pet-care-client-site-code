import { useContext } from "react";
import usePayment from "../../../../Hooks/usePayment";
import { AuthContext } from "../../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MYDonation = () => {
    const [payment, refetch] = usePayment();
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const filteredData = payment.filter((campaign) => campaign.userEmail === user.email)


    const handleRefund = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, i want to get refund"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/create-payment/${item._id}`);
                
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'you will get refund',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
    
    
            }
        });
    }

    return (
        <div>
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
                                <th>Refund</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                filteredData.map((item, index) => <tr key={item._id}>
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
                                        {item.petName}
                                    </td>
                                  
                                    <td>
                                        {item.donatedAmount}
                                    </td>
                                    
                                   
                                    <td>
                                  
                                            <button onClick={() => handleRefund(item)}
                                                className=" btn btn-ghost btn-sm">
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

export default MYDonation;