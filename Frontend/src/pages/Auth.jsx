import React from 'react'
import IMG from '../assets/login.png'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";




export const Login = () => {
    return (
        <div className='w-full sm:h-[88vh] flex'>
            {/* left form  */}
            <div className='relative  w-1/2 flex flex-col items-center justify-center space-y-6 overflow-hidden backdrop-blur'>

                <div className="absolute top-30 left-50 w-70 h-70 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-8 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-170 left-0 w-170 h-170 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>

                <form
                    className="w-full flex flex-col justify-center items-center gap-7 sm:w-[60%] z-10"

                >
                    {/* Heading */}
                    <div className="press-start-2p-regular text-3xl text-gray-800">
                        LOGIN
                    </div>

                    {/* Email */}
                    <div className="relative w-full ">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FaUser />
                        </span>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>


                    {/* Password */}
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <RiLockPasswordFill />
                        </span>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Log In
                    </button>


                    <div class="text-center mt-4">
                        <p class="text-sm text-gray-600">
                            Don't have an account?
                            <a href="/signup" class="text-blue-600 hover:underline font-medium">Sign up</a>
                        </p>
                    </div>

                </form>
            </div>



            {/* right image  */}
            <div className=' w-0 relative sm:w-1/2 flex flex-col justify-center overflow-hidden '>
                <div className="absolute top-5 left-170  w-100 h-100 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-90 left-80  w-60 h-60 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className='absolute top-30 left-10  text-gray-800'>
                    <div className='press-start-2p-regular text-3xl'>WELCOME BACK</div>
                    <div className='text-center'> CREATE . CODE . COMPILE</div>
                </div>
                <img src={IMG} className='absolute object-contain z-10 bottom-0 ' />
            </div>
        </div>
    )
}

export const Signup = () => {
    return (
        <div className='w-full sm:h-[88vh] flex'>
            {/* left form */}
            <div className='relative w-1/2 flex flex-col items-center justify-center space-y-6 overflow-hidden backdrop-blur'>

                <div className="absolute top-30 left-50 w-70 h-70 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-8 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-170 left-0 w-170 h-170 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>

                <form
                    className="w-full flex flex-col justify-center items-center gap-7 sm:w-[60%] z-10"
                    onSubmit={e => {
                        e.preventDefault();
                        // your signup handler here
                    }}
                >
                    {/* Heading */}
                    <div className="press-start-2p-regular text-3xl text-gray-800">
                        SIGN UP
                    </div>

                    {/* Name */}
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FaUser />
                        </span>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FaUser />
                        </span>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <RiLockPasswordFill />
                        </span>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                        Sign Up
                    </button>

                    {/* Already have an account */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                            <a href="/login" className="text-blue-600 hover:underline font-medium"> Log in</a>
                        </p>
                    </div>
                </form>
            </div>

            {/* right image */}
            <div className='w-0 relative sm:w-1/2 flex flex-col justify-center overflow-hidden'>
                <div className="absolute top-5 left-170 w-100 h-100 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-90 left-80 w-60 h-60 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className='absolute top-30 left-10 text-gray-800'>
                    <div className='press-start-2p-regular text-3xl'>JOIN US</div>
                    <div className='text-center'> CREATE . CODE . COMPILE</div>
                </div>
                <img src={IMG} className='absolute object-contain z-10 bottom-0' />
            </div>
        </div>

    )
}




