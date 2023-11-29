import { useContext, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import usePetListing from '../../../../Hooks/usePetListing';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import ReactPaginate from 'react-paginate';
import './MyAddedPets.css';


const MyAddedPets = () => {
  const { user } = useContext(AuthContext);
  const [petList, refetch] = usePetListing();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const petsPerPage = 10;

  const filteredData = petList.filter((pet) => pet.userEmail === user.email);
  const offset = currentPage * petsPerPage;
  const currentPets = filteredData.slice(offset, offset + petsPerPage);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleDeletePet = (item) => {
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
            const res = await axiosSecure.delete(`/petLIsting/${item._id}`);
            
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

const handleUpdateADoptedPet = async (item) => {
  const updateADoptedStatus = {
    name: item.name,
    type: item.type,
    age: item.age,
    location: item.location,
    image: item.image,
    srDescription: item.srDescription,
    lgDescription: item.lgDescription,
    adopted: true,
  };

  try {
    const petRes = await axiosSecure.patch(`/petLIsting/${item._id}`, updateADoptedStatus);

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
                                <th>Pet Category</th>
                                <th>Adoption Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Adopted</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                currentPets.map((item, index) => <tr key={item._id}>
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
                                  
                                    <td>
                                        {item.type}
                                    </td>
                                    <td>

                                        {
                                        item.adopted === false ? <p> Not Adopted</p>
                                        :
                                        <p>Adopted</p>
                            
                                        }
                                    </td>
                                   
                                    <td>
                                  
                                            <button onClick={() => handleDeletePet(item)}
                                                className=" btn btn-ghost btn-sm">
                                                    Delete
                                            </button>
                                        
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button
                                                className=" btn btn-ghost btn-sm">
                                                    Update
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateADoptedPet(item)}
                                            className="btn btn-ghost btn-sm">
                                                Adopted
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
            {filteredData.length > petsPerPage && (
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredData.length / petsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      )}
        </div>
  );
};

export default MyAddedPets;
