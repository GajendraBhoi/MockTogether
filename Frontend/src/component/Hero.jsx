import React from 'react'
import BACK from '../assets/back.png'
import FRONT from '../assets/front.png'
import Button from './Button'

import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row '>
            {/* left text  */}
            <div className='w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0 gap-15 sm:pl-40  sm:pt-40 text-nowrap'>
                <div className='text-[#414141]'>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='press-start-2p-regular text-2xl sm:py-3 lg:text-5xl text-gray-600 z-10'>CODE TOGETHER</p>
                        <p className='press-start-2p-regular font-medium text-sm md:text-base text-gray-600'>BUILD BETTER</p>
                        <TypeAnimation
                            sequence={[
                                'Welcome to Code Together!', // Text to display
                                1000, // Wait 1 second before starting to delete
                                '', // Empty string to simulate deletion
                                500, // Wait 0.5 seconds before typing again
                                // This will repeat infinitely
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '2em', display: 'inline-block', fontFamily: 'press-start-2p-regular' }}
                            repeat={Infinity}
                            className='press-start-2p-regular'
                        />
                    </div>
                </div>


                <Link to='/crateRoom'>
                    <Button text='CREATE ROOM' />
                </Link>
            </div>

            <div className="w-full sm:w-1/2 relative">
                <img
                    src={BACK}
                    className="absolute top-0 right-5 w-full h-full object-cover z-0 animate-updown "
                    draggable={false}
                />
                <img
                    src={FRONT}
                    className="relative z-10 w-full h-full object-contain transform sm:scale-125"
                    draggable={false}
                />

                {/* CSS for animation */}
                <style>
                    {`
                    @media (min-width: 640px) {
                    @keyframes updown {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                    .animate-updown {
                        animation: updown 3s ease-in-out infinite;
                    }
                    }
                `}
                </style>

            </div>


        </div>
    )
}

export default Hero