import React, { useState } from 'react';
import IMG from '../assets/login.png';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        try {
            // await the login helper
            const success = await login(email, password);

            if (!success) {
                // login() returned false → show an error
                setError("Invalid email or password.");
            }
            // else, login() already did navigate('/') for you

        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='w-full sm:h-[88vh] flex'>
            <div className='relative w-1/2 flex flex-col items-center justify-center space-y-6 overflow-hidden backdrop-blur'>
                <div className="absolute top-30 left-50 w-70 h-70 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-8 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-170 left-0 w-170 h-170 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>

                <form
                    onSubmit={handleLogin}
                    className="w-full flex flex-col justify-center items-center gap-7 sm:w-[60%] z-10"
                >
                    <div className="press-start-2p-regular text-3xl text-gray-800">LOGIN</div>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="relative w-full">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><FaUser /></span>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><RiLockPasswordFill /></span>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-900 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <button
                                type="button"
                                className="text-blue-600 hover:underline font-medium ml-1"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className='w-0 relative sm:w-1/2 flex flex-col justify-center overflow-hidden'>
                <div className="absolute top-5 left-170 w-100 h-100 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-90 left-80 w-60 h-60 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className='absolute top-30 left-10 text-gray-800'>
                    <div className='press-start-2p-regular text-3xl'>WELCOME BACK</div>
                    <div className='text-center'> CREATE . CODE . COMPILE</div>
                </div>
                <img src={IMG} alt="Login illustration" className='absolute object-contain z-10 bottom-0' />
            </div>
        </div>
    )
}

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(email);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        if (name.length < 3) {
            setError("Name must be at least 3 characters long.");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Crucial for cookies
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.Message || 'Signup failed');
            }

            login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full sm:h-[88vh] flex'>
            <div className='relative w-1/2 flex flex-col items-center justify-center space-y-6 overflow-hidden backdrop-blur'>
                <div className="absolute top-30 left-50 w-70 h-70 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-8 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-170 left-0 w-170 h-170 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>

                <form
                    onSubmit={handleSignup}
                    className="w-full flex flex-col justify-center items-center gap-7 sm:w-[60%] z-10"
                >
                    <div className="press-start-2p-regular text-3xl text-gray-800">SIGN UP</div>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="relative w-full">
                        <label htmlFor="name" className="sr-only">Name</label>
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><FaUser /></span>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="signup-email" className="sr-only">Email</label>
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><FaUser /></span>
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="signup-password" className="sr-only">Password</label>
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><RiLockPasswordFill /></span>
                        <input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="relative w-full">
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><RiLockPasswordFill /></span>
                        <input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-900 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                            <button
                                type="button"
                                className="text-blue-600 hover:underline font-medium ml-1"
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            <div className='w-0 relative sm:w-1/2 flex flex-col justify-center overflow-hidden'>
                <div className="absolute top-5 left-170 w-100 h-100 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute top-90 left-80 w-60 h-60 bg-blue-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-500/50"></div>
                <div className='absolute top-30 left-10 text-gray-800'>
                    <div className='press-start-2p-regular text-3xl'>JOIN US</div>
                    <div className='text-center'> CREATE . CODE . COMPILE</div>
                </div>
                <img src={IMG} alt="Signup illustration" className='absolute object-contain z-10 bottom-0' />
            </div>
        </div>
    )
}