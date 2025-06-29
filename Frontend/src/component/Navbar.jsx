import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { BiMenuAltRight, BiLogOut } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from '../context/AuthContext'; // Update path as needed

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { isAuthenticated, logout, isLoading } = useAuth();

    const handleLogout = () => {
        logout();
        setVisible(false);
    };

    return (
        <div className='relative z-50 flex items-center justify-between py-5 font-medium bg-white'>
            <img src={logo} className='w-36' alt='logo' />

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='press-start-2p-regular'>HOME</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/room' className='flex flex-col items-center gap-1'>
                    <p className='press-start-2p-regular'>ROOMS</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p className='press-start-2p-regular'>ABOUT</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p className='press-start-2p-regular'>CONTACT</p>
                    <div className='w-2/4 h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                {!isLoading && (
                    <>
                        {/* Desktop Auth Buttons */}
                        <div className="hidden sm:flex items-center gap-4">
                            {!isAuthenticated ? (
                                <>
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
                                </>
                            ) : (
                                <>

                                    <IoMdLogOut onClick={logout} className='text-4xl text-blue-900 hover:transition duration-200 ease-in-out cursor-pointer' />

                                    <Link to='/profile'>
                                        <CgProfile className='text-4xl text-blue-900' />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Icon */}
                        <BiMenuAltRight
                            onClick={() => setVisible(true)}
                            className='text-3xl cursor-pointer sm:hidden'
                        />
                    </>
                )}
            </div>

            {/* Mobile Slidebar */}
            <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600 h-full'>
                    <div className='p-4 flex justify-end'>
                        <RxCross1
                            onClick={() => setVisible(false)}
                            className='text-3xl cursor-pointer'
                        />
                    </div>

                    <div className='flex-1 flex flex-col'>
                        <NavLink to='/' onClick={() => setVisible(false)} className='p-4 border-b'>HOME</NavLink>
                        <NavLink to='/room' onClick={() => setVisible(false)} className='p-4 border-b'>ROOMS</NavLink>
                        <NavLink to='/about' onClick={() => setVisible(false)} className='p-4 border-b'>ABOUT</NavLink>
                        <NavLink to='/contact' onClick={() => setVisible(false)} className='p-4 border-b'>CONTACT</NavLink>

                        <div className='mt-auto p-4 border-t'>
                            {!isAuthenticated ? (
                                <>
                                    <NavLink to='/login' onClick={() => setVisible(false)} className='block p-3 text-center bg-blue-900 text-white rounded-lg mb-3'>
                                        Log In
                                    </NavLink>
                                    <NavLink to='/signup' onClick={() => setVisible(false)} className='block p-3 text-center border-2 border-blue-900 text-blue-900 rounded-lg'>
                                        Sign Up
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to='/profile' onClick={() => setVisible(false)} className='flex items-center gap-2 p-3 mb-3'>
                                        <CgProfile className='text-xl' /> Profile
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full flex items-center gap-2 p-3 text-red-600 border-2 border-red-600 rounded-lg'
                                    >
                                        <BiLogOut className="text-xl" /> Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;