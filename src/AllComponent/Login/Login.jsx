import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase/firebase.config';
import useAxiosOpen from '../../Hooks/useAxiosOpen';
const auth = getAuth(app);

const Login = () => {
  
  const [loginError, setLoginError] = useState("");
  const [successLogin, setSuccessLogin] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const gitHUbProvider = new GithubAuthProvider();

  const {signIn} = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const axiosOpen = useAxiosOpen();

  const handleGithubLogin = ()=>{
    // reset error
    setLoginError("");
    // reset login
    setSuccessLogin("");

    signInWithPopup(auth,gitHUbProvider)
      .then((result) => {
          const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName
          }
          axiosOpen.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        
      })
      .catch((error) => {
        setLoginError("Invalid Gmail Or Password");
      });
  }


  const handleGoogleLogin = () =>{
     // reset error
     setLoginError("");
     // reset login
     setSuccessLogin("");

     signInWithPopup(auth,googleProvider)
      .then((result) => {
          const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName
          }
          axiosOpen.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/');
            })
        
      })
      .catch((error) => {
        setLoginError("Invalid Gmail Or Password");
      });
  }



    const handleLoginButtonSubmit = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email,password)
        .then((result)=>{
            const user = result.user
            Swal.fire({
              title: "Login Successfully",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            });
            navigate(from, { replace:true});
        })
        .catch((error)=>{
            const errorcode = error.code;
            const errorMessage = error.message;
        })
    }

   



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLoginButtonSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            


            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value='login' />
            </div>
            <NavLink to={'/signUp'}>Need To Create An Account?</NavLink>
          </form>

          {/* signUp with google account */}
          <div onClick={handleGoogleLogin} className='flex justify-center item-center'>
            <button className='mr-1'>Sign In With</button>
            <button><FcGoogle /></button>
          </div>

          <div className='flex justify-center item-center' onClick={handleGithubLogin}>
            <p className='mr-3'>GitHUb </p>
            <button><FaGithub /></button>
          </div>

          {
            loginError && <p className="text-center text-red-700">{loginError}</p>}
            {
            successLogin && 
              <p className="text-center text-green-700">{successLogin}</p>
            }


        </div>
      </div>
    </div>
  );
};

export default Login;
