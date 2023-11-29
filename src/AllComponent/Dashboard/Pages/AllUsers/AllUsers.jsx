import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = user =>{
    axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
  }



  return (
    <div>
        {/* heading */}
      <div className="md:text-3xl text-center">All Users: {users.length}</div>
      
      {/* table */}
      <div className="overflow-x-auto">
        <table className="table grid grid-cols-1">
          {/* head */}
          <thead>
            <tr>
              <th>Name And Profile Picture</th>
              <th className="md:pl-40">email</th>
              <th></th>
            </tr>
          </thead>

          {/* table body */}
          <tbody>
            {
                users.map(user=><tr key={user._id}>
                    {/* name and profile picture */}
                  <td>
                    <div className="flex items-center md:gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-5 h-5 md:w-12 md:h-12">
                          <img
                            src={user.proPicture}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-xs md:text-lg">{user.name}</div>
                      </div>
                    </div>
                  </td>
    
                  {/* email And  admin button*/}
                  <div className="grid lg:flex">
                    <td className="text-xs md:text-lg">
                      {user.email}
                    </td>
                    <th>
                      {user.role === 'admin' ? 'Admin' :
                          <button 
                          onClick={()=> handleMakeAdmin(user)}
                          className="btn btn-xs text-xs text-white bg-orange-500">
                          Make Admin
                      </button>
                      }

                    </th>
                  </div>
                </tr>)
            }

          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
