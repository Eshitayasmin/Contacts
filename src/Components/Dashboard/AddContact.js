import React from 'react';
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';

const AddContact = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgStorageKey = process.env.REACT_APP_IMAGE_STORAGE_KEY;
    const onSubmit = async data => {
        console.log('check data', data);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.success) {
                    const img = result.data.url;
                    const newContact = {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        img: img
                    }
                    fetch('http://localhost:5000/contact', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(newContact)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('A New Contact Has Been Added to List Successfully');
                                reset();
                            }
                            else {
                                toast.error("Failed to Add Contact")
                            }
                        })
                }
                // console.log('imgbb', result)
            })

    };

    return (
        <div>
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5  dark:bg-gray-800">
                <div className="flex justify-center">
                    <p className="text-2xl text-pink-500 dark:text-gray-100 font-bold ">Add A Contact</p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                    {/* <div className='flex gap-5'>
                        <div>
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input {...register("firstName", { required: true })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent" />
                            {errors.firstName && <p className='text-red-500'>First name is required</p>}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input {...register("lastName", { required: true })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent" />
                            {errors.lastName && <p className='text-red-500'>Last name is required</p>}
                        </div>
                    </div> */}
                  <div>
                  <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input {...register("name", { required: "Name is required" })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent" />
                    <p className='text-red-500'>{errors.name?.message}</p>
                  </div>
                  <div>
                  <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register("email", { required: "Email Address is required" })} className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent" />
                    <p className='text-red-500'>{errors.email?.message}</p>
                  </div>
                 <div>
                 <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input {...register("phone", { required: "Phone Number is required" })} type="number" className="input border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent" />
                    <p className='text-red-500'>{errors.phone?.message}</p>
                 </div>
                   

                    <div>
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input {...register("address", { required: "Address is required" })} className="input w-96 border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent" type='text' />
                        <p className='text-red-500'>{errors.address?.message}</p>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input {...register("img", { required: "Photo is required" })} className=" border-transparent appearance-none  border border-gray-400 p-2 bg-white w-full shadow-sm text-base rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent border-white" type='file' />
                        <p className='text-red-500'>{errors.img?.message}</p>
                    </div>


                    <input type="submit" className="hover:bg-orange-400 btn btn-info text-lg text-white font-bold w-full mt-5 border-none" value="Save" />
                </form>
        </div>
    );
};

export default AddContact;