import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import usePetListing from "../../Hooks/usePetListing";

const PetDetailsCardMake = ({ data }) => {
    const { name, age, location, image } = data;

    const {user} =useContext(AuthContext);
    const {displayName,email} = user;
    const navigate = useNavigate();
    

    
    const axiosSecure = useAxiosSecure();


    const handleAdoptionRequest = async(e)=>{
      e.preventDefault();
      const form = e.target;
      const number = form.number.value;
      const address = form.address.value;
      const petName = name;
      const petAge =age;
      const petLocation =location;
      const petImage =image;

      const adoptionRequest = {
        displayName, email,number, address,petName,petAge,petLocation,petImage
      }
      try {
      const adoptionRes = await axiosSecure.post('/adoptionRequest', adoptionRequest);
            
            if(adoptionRes.data.insertedId){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} of adoption request successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/petListing')
            }
          }
          catch (error) {
            // Handle errors here
            console.error('Adoption request failed:', error);
            // You can also show an error message to the user using Swal or other means
          }

    }


    
   //send Data to the server 

  return (
    <div className="w-full mb-11">
      <div className=" w-4/5 mx-auto bg-base-100 shadow-xl">
        <figure>
          <img className="w-full" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-6xl text-purple-700 ">
            {name}
            <div className="badge badge-secondary">AGE:0{age}</div>
          </h2>
          <div className="card-actions justify-end">
            <div className=" badge badge-outline">{location}</div>
          </div>
        </div>

        {/* adopt button */}

                <div>
                    <button className="btn block w-full mx-auto text-white btn-info" onClick={()=>document.getElementById('my_modal_5').showModal()}>Adopt</button>
                    {/* <button className="btn block btn-success" onClick={()=>document.getElementById('my_modal_5').showModal()}>Borrow</button> */}
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Adopt Now</h3>
                        

                        <div className="modal-action">
                          <form onSubmit={handleAdoptionRequest} method="dialog">
                            <input className="input input-bordered mr-2 mb-2" disabled={true} placeholder="Your Name" type="text" name="name" defaultValue={displayName}/>
                            <input className="input input-bordered  mb-2" disabled={true} placeholder="Your Email" type="email" name="email" defaultValue={email}/>
                            <input className="input input-bordered  mb-2" placeholder="Your Number" type="text" name="number"/>
                            <input className="input input-bordered  mb-2" placeholder="Your Address" type="text" name="address"/>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Submit</button>
                            <button type="button" className="btn" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
                          </form>
                        </div>
                      </div>
                  </dialog>
              </div>



      </div>
    </div>
  );
};

export default PetDetailsCardMake;
