import React from 'react'
import IMG from '../assets/heroImg.png'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row '>
            {/* left text  */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='press-start-2p-regular text-2xl sm:py-3 lg:text-4xl text-gray-600'>CODE TOGETHER</p>
                        <p className='press-start-2p-regular font-medium text-sm md:text-base text-gray-600'>BUILD BETTER</p>
                    </div>
                </div>
            </div>

            {/* right img  */}
            <img className='w-full sm:w-1/2' src={IMG} />
        </div>
    )
}

export default Hero