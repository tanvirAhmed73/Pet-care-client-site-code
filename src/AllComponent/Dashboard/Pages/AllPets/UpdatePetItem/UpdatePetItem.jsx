import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdatePetItem = () => {
    const {_id ,name, type, age, location, image, srDescription, lgDescription, adopted} = useLoaderData();
    const { register, handleSubmit } = useForm();
    // const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
            const addedPet = {
                name: data.name,
                type: data.type,
                age: data.age,
                location: data.location,
                image: data.image,
                srDescription: data.srDescription,
                lgDescription: data.lgDescription,
                adopted : data.adopted,
            }
            // 
            const petRes = await axiosSecure.patch(`/petLIsting/${_id}`, addedPet);
            if(petRes.data.modifiedCount > 0){
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the Pet Item.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        
    };
    
    
    return (
        <div>
            <div className="p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                <header className="text-5xl text-center underline">Update Pet Item</header>
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
                    {/* pet age */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Pet Age*</span>
                        </label>
                        <input
                            type="number"
                            defaultValue={age}
                            placeholder="Pet Age"
                            {...register('age', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* pet location */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Pet location*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={location}
                            placeholder="Pet location"
                            {...register('location', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    {/* pet Adoption Status */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Pet Adoption Status*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Pet Adoption"
                            defaultValue={adopted}
                            {...register('adopted', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={type} {...register('type', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="Dogs">Dogs</option>
                                <option value="Cats">Cats</option>
                                <option value="Fish">Fish</option>
                                <option value="Rabbits">Rabbits</option>
                            </select>
                        </div>

                        {/* short description */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Short Description*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={srDescription}
                                placeholder="Short Description"
                                {...register('srDescription', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* LOng Desciption */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Long Desciption</span>
                        </label>
                        <textarea {...register('lgDescription')} defaultValue={lgDescription} className="textarea textarea-bordered h-24" placeholder="LOng Desciption"></textarea>
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
                        Update Pet Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePetItem;