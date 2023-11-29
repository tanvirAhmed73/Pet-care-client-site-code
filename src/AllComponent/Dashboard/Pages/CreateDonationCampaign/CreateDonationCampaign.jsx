import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAxiosOpen from "../../../../Hooks/useAxiosOpen";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const CreateDonationCampaign = () => {
    const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const {user}= useContext(AuthContext)

    const onSubmit = async (data) => {
        // Get the current date and time
         const currentDate = new Date();
        const creationDateTime = currentDate.toISOString();
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosOpen.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {

            const addedDonation = {
                name: data.name,
                image: data.image,
                maxDonationAmount: data.maxDonation,
                lastDateOfDonation: data.lastDateOfDonation,
                donated: false,
                srDescription: data.srDescription,
                lgDescription: data.lgDescription,
                userEmail : user.email,
                createdAt: creationDateTime,
            }
            // 
            const petRes = await axiosSecure.post('/donationCampaign', addedDonation);
            
            if(petRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} Donation Campaign Added`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        
    }


  return (
    <div>
        <div>
           
            <div className="p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <header className="md:text-5xl text-center">Create Donation Campaign</header>
                    {/* pet name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Pet Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Pet Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* Maximum donation amount */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Maximum donation amount*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Maximum donation amount"
                            {...register('maxDonation', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    
                    {/* Last Date OF Donation */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Last Date OF Donation*</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Last Date OF Donation"
                            {...register('lastDateOfDonation', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>


                    <div className="lg:flex gap-6">
                        
                        {/* LOng Desciption */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Long Desciption</span>
                            </label>
                            <textarea {...register('lgDescription')} className="textarea textarea-bordered h-24" placeholder="LOng Desciption"></textarea>
                        </div>

                        {/* short description */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Short Description*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Short Description"
                                {...register('srDescription', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn btn-info">
                        Submit 
                    </button>
                </form>
            </div>
        </div>
    </div>
    
  );
};

export default CreateDonationCampaign;