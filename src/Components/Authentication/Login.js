import React, { useEffect } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const [sendPasswordResetEmail, RestSending, ResetError] = useSendPasswordResetEmail(auth);
      const navigate = useNavigate();
      const location = useLocation();
   


      let signInError;
      const from = location.state?.from?.pathname || '/';
    
    //   useEffect(() =>{
          
    //   if (token) {
    //     navigate(from, {replace: true});
    // }
    //   }, [token, from, navigate]);

  if(user){
    navigate('/');
  }

    if(error || gError){
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    const resetPassword = async () => {
        const email = document.getElementById('email').value;
        console.log(email);
       if(email){
        await sendPasswordResetEmail(email);
        toast.success('sent email');
       }

       else{
           toast.error('Please provide your email address');
       }
    }


    const onSubmit = async data => {
        signInWithEmailAndPassword(data.email, data.password);
       
    };

    return (
        <div className='flex h-screen items-center justify-center bg-base-100 pb-4 lg:pb-8 overflow-visible bg-black'>
        <div className="card w-11/12 lg:w-1/4  bg-base-100 shadow-xl">
            <div className="card-body ">
                <h2 className="text-center text-xl mx:text-2xl lg:text-3xl font-bold text-blue-700">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>

                        <input
                            type="email" placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })} />

                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}

                        </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input
                            type="password" placeholder="Password"
                            className="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be six characters or longer'
                                }
                            })} />

                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}

                        </label>
                    </div>
               
                    <input className='btn w-full max-w-xs text-white' type="submit" value="Sign Up" />
                </form>

                <p className='py-1'>New to Contacts App? <Link className='text-blue-500' to="/signUp">Please SignUp</Link></p>

                

            </div>
        </div>
    </div>
    );
};

export default Login;