import React from 'react'
import Hero from '../component/Hero';

function Landing() {
    return (
        <div className='flex flex-col'>
            <Hero />

            <h2 className='press-start-2p-regular mt-25 text-center text-2xl text-gray-600'>HOW IT WORKS</h2>
        </div>
    );
}

export default Landing