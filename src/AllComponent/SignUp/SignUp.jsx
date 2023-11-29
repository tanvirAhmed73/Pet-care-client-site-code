import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosOpen from "../../Hooks/useAxiosOpen";
import Swal from "sweetalert2";

const SignUp = () => {
  const axiosOpen = useAxiosOpen()
  // react hook form
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = data => {
    createUser(data.email, data.password)
        .then(result => {
            const loggingUser = result.user;
            updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        proPicture: data.photoURL,
                    }
                    axiosOpen.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        })


                })
                .catch(error => console.log(error))
        })
      };




   
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}  className="card-body">
          {/* name */}
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
              {errors.name && <span className="text-red-600">Name is required</span>}
          </div>
          {/* photo url */}
          <div className="form-control">
              <label className="label">
                  <span className="label-text">Photo URL</span>
              </label>
              <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
              {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
          </div>
          {/* email */}
          <div className="form-control">
              <label className="label">
                  <span className="label-text">Email</span>
              </label>
              <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
              {errors.email && <span className="text-red-600">Email is required</span>}
          </div>
          {/* password */}
          <div className="form-control">
              <label className="label">
                  <span className="label-text">Password</span>
              </label>
              <input type="password"  {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
              })} placeholder="password" className="input input-bordered" />
              {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
              {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
              {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
              {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
              <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
          </div>
          {/* signup button */}
          <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Sign Up" />
          </div>
          <NavLink to={'/login'}>Already Have An Account?</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
