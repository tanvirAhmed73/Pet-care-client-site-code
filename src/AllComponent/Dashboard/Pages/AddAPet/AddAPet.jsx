
// import { useFormik } from "formik";
// import Select from 'react-select';
import { useForm } from "react-hook-form";
import useAxiosOpen from "../../../../Hooks/useAxiosOpen";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddAPet = () => {
    const axiosOpen = useAxiosOpen();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const {user}= useContext(AuthContext)

    const onSubmit = async (data) => {
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosOpen.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {

            const addedPet = {
                name: data.name,
                type: data.type,
                age: data.age,
                location: data.location,
                image: res.data.data.display_url,
                srDescription: data.srDescription,
                lgDescription: data.lgDescription,
                adopted : false,
                userEmail : user.email
            }
            // 
            const petRes = await axiosSecure.post('/petLIsting', addedPet);
            
            if(petRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the Pet Listing.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
        
    }
        
    // const axiosSecure = useAxiosSecure()
//   const formik = useFormik({
//     initialValues: {
//         image: '',
//         name: '',
//         age: '',
//         type: '', 
//         location: '',
//         srDescription: '',
//         lgDescription: '',
//     },
//     onSubmit: async(values) => {
//         console.log(values)
//         image upload to imgbb and then get an url
//         const imageFile = new FormData();
//         imageFile.append('image', values.image[0]);
//         const res = await axiosOpen.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             },
            
//         });
//         console.log(res.value);

//       alert(JSON.stringify(values, null, 2));
//     },
//   });

  // Pet category options
//   const petCategoryOptions = [
//     { value: 'dogs', label: 'Dogs' },
//     { value: 'cats', label: 'Cats' },
//     { value: 'Rabbits', label: 'Rabbits' },
//     { value: 'fish', label: 'Fish' },
//     // Add more pet categories as needed
//   ];

  return (
    <div>
        <div>
           
            <div className="p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <header className="text-5xl text-center">Add A Pet</header>
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
                    {/* pet age */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Pet Age*</span>
                        </label>
                        <input
                            type="number"
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
                            placeholder="Pet location"
                            {...register('location', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>


                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('type', { required: true })}
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
                        <textarea {...register('lgDescription')} className="textarea textarea-bordered h-24" placeholder="LOng Desciption"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn btn-info">
                        Add Item 
                    </button>
                </form>
            </div>
        </div>
    </div>
    // <div>
      
    //   <div>
    //     <form className="bg-gray-600 p-8 mx-4" onSubmit={formik.handleSubmit}>
    //         <header className="text-5xl underline text-center">Add A Pet</header>
    //         {/* Pet image */}
    //       <div className="form-control ">
    //         <label className="uppercase text-2xl " htmlFor="image">Pet Image: </label>
    //         <input
    //             className="mb-4"
    //             id="image"
    //             name="image"
    //             type="file"
    //             onChange={formik.handleChange}
    //             // value={formik.values.image}
    //         />
    //       </div>
    //         {/* Pet Name */}
    //       <div className="form-control w-full">
    //         <label className="uppercase text-2xl " htmlFor="name">Pet Name: </label>
    //         <input
    //             className="input input-sm input-bordered mb-4"
    //             id="name"
    //             name="name"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.name}
    //         />
    //       </div>
    //         {/* Pet age */}
    //       <div className="form-control w-full">
    //         <label className="uppercase text-2xl " htmlFor="age">Pet Age: </label>
    //         <input
    //             className="input input-sm input-bordered mb-4"
    //             id="age"
    //             name="age"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.age}
    //         />
    //       </div>

    //         {/* Pet category t*/}
    //       <div className="form-control w-full">
    //         <label className="uppercase text-2xl " htmlFor="type">
    //           Pet category:
    //         </label>
    //         <Select
    //           id="type"
    //           name="type"
    //           options={petCategoryOptions}
    //           onChange={(selectedOption) => formik.setFieldValue('type', selectedOption.value)}
    //           value={petCategoryOptions.find((option) => option.value === formik.values.type)}
    //           placeholder="Select a pet category"
    //         />
    //       </div>

    //         {/* Pet location */}
    //       <div className="form-control w-full">
    //         <label className="uppercase text-2xl " htmlFor="location">Pet location: </label>
    //         <input
    //             className="input input-sm input-bordered mb-4"
    //             id="location"
    //             name="location"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.location}
    //         />
    //       </div>
    //         {/* Short description */}
    //       <div className="form-control w-full">
    //         <label className="uppercase text-2xl " htmlFor="srDescription">Short description: </label>
    //         <input
    //             className="input input-sm input-bordered mb-4"
    //             id="srDescription"
    //             name="srDescription"
    //             type="text"
    //             onChange={formik.handleChange}
    //             value={formik.values.srDescription}
    //         />
    //       </div>
    //         {/* Long description */}
    //       <div className="form-control w-full">
    //         <label className="uppercase text-2xl " htmlFor="lgDescription">Long description: </label>
    //         <textarea 
    //             className="input input-sm input-bordered mb-4"
    //             id="lgDescription"
    //             name="lgDescription" 
    //             cols="30" 
    //             rows="10"
    //             onChange={formik.handleChange}
    //             value={formik.values.lgDescription}
    //             >
    //         </textarea>
            
    //       </div>
          
          


    //       <button className="btn btn-info" type="submit">Add Pet</button>

    //     </form>
    //   </div>
    // </div>
  );
};

export default AddAPet;
