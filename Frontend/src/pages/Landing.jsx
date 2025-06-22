import React from 'react'

function Landing() {
    return (
        <div className='w-full'>
            <header className='w-full'>
                <div className='flex justify-between'>
                    {/* logo  */}
                    <div>
                        LOGO
                    </div>

                    <nav className='flex justify-around'>
                        <a href="">Home</a>
                        <a href="">About us</a>
                        <button href="">Login</button>
                        <button href="">Sign up</button>
                    </nav>
                </div>
            </header>

            <section>
                <div>
                    <h1>CODEHUB</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, harum?</p>
                    <button>Get Started</button>
                </div>
            </section>

            <footer>
                <div>

                </div>
            </footer>
        </div>
    );
}

export default Landing