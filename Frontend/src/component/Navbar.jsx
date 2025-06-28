import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink, Link } from 'react-router-dom'

import { CgProfile } from "react-icons/cg";
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";


const Navbar = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <img src={logo} className='w-36' alt='logo' />


            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                {/* it will be visible only for small and above screen */}


                {/* when we will open any navlink it will add active to its class name  */}
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                    {/* we will add active funcn in index.css  */}
                </NavLink>


                <NavLink to='/room' className='flex flex-col items-center gap-1'>
                    <p>ROOMS</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>


                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>


                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="press-start-2p-regular text-sm uppercase bg-blue-900 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200 ease-in-out cursor-pointer"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="press-start-2p-regular text-sm uppercase border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-xl hover:bg-blue-900 hover:text-white transition duration-200 ease-in-out cursor-pointer"
                    >
                        Sign Up
                    </Link>
                </div>


                <Link to='/profile' className=''>
                    <CgProfile className='text-4xl' />
                </Link>

                <BiMenuAltRight onClick={() => { setVisible(true) }} className='text-3xl cursor-pointer sm:hidden ' />

            </div>

            {/* slidebar for small screens  */}
            <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => { setVisible(false) }} className='flex items-center text-3xl p-3'>
                        <RxCross1 />

                    </div>

                    <NavLink to='/' onClick={() => { setVisible(false) }} className='flex items-center m-4 ml-6'>HOME</NavLink>
                    <NavLink to='/room' onClick={() => { setVisible(false) }} className='flex items-center m-4 ml-6'>ROOMS</NavLink>
                    <NavLink to='/about' onClick={() => { setVisible(false) }} className='flex items-center m-4 ml-6'>ABOUT</NavLink>
                    <NavLink to='/contact' onClick={() => { setVisible(false) }} className='flex items-center m-4 ml-6'>CONTACT</NavLink>

                </div>
            </div>
        </div>
    )
}

export default Navbar


// TODO : login and signup not working on homepage