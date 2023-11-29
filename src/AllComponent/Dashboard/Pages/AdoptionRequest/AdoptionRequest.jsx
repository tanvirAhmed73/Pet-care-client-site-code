import { useContext } from "react";
import useAdoptionRequest from "../../../../Hooks/useAdoptionRequest";
import { AuthContext } from "../../../../Providers/AuthProvider";

const AdoptionRequest = () => {
    const [adoptionRequest] =useAdoptionRequest();
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
                                <th>Age</th>
                                <th>Location</th>
                                <th>Name Of the Adopter</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Accept</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adoptionRequest.map((item, index) => <tr key={item._id}>
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
                                        {item.petAge}
                                    </td>
                                    <td>
                                        {item.petLocation}
                                    </td>
                                    <td>
                                        {item.displayName}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.number}
                                    </td>
                                    <td>
                                        {/* <Link to={`/dashboard/updateItem/${item._id}`}> */}
                                            <button
                                                className=" btn btn-ghost btn-sm">
                                                    Accept
                                            </button>
                                        {/* </Link> */}
                                    </td>
                                    <td>
                                        <button
                                            // onClick={() => handleDeletePet(item)}
                                            className="btn btn-ghost btn-sm">
                                                Reject
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

export default AdoptionRequest;