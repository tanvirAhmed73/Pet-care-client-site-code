import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const EditDonationPage = () => {

    const {_id ,name, image, maxDonationAmount, donatedAmount, donated} = useLoaderData();
    const { register, handleSubmit } = useForm();
    // const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        const editDonation = {
            name: data.name,
            image: data.image,
            donated : data.donated,
            maxDonationAmount: data.maxDonationAmount,
            donatedAmount: data.donatedAmount
        }
        
        const doNetRes = await axiosSecure.patch(`/donationCampaign/${_id}`, editDonation);
        if(doNetRes.data.modifiedCount > 0){
            
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is updated to the Donation.`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    
};

    return (
        <div>
            <div className="p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                <header className="md:text-5xl text-center underline">Update Donation Item</header>
                    {/* pet name */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Pet Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Pet Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* Maximun Donation Amount */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Maximun Donation Amount*</span>
                        </label>
                        <input
                            type="number"
                            defaultValue={maxDonationAmount}
                            placeholder="Maximun Donation Amount"
                            {...register('maxDonationAmount', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* Donated Amount */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Donated Amount*</span>
                        </label>
                        <input
                            type="number"
                            defaultValue={donatedAmount}
                            placeholder="Donated Amount"
                            {...register('donatedAmount', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* Donated Status */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">To Pause Type True*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Donated Status"
                            defaultValue={donated}
                            {...register('donated', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    


                    {/* image */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Image*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Update Image "
                            defaultValue={image}
                            {...register('image', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    


                    <button className="btn">
                        Update Donation Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditDonationPage;