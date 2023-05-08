import React from 'react'
import { Link } from 'react-router-dom';

const LandingScreen = () => {

    if (localStorage.getItem('token')) {
        window.location.href = "/home";
    }

    return (
        <>
            <div className='landing'>

                <div className="col-md-12 text-center">

                    <h3 style={{ color: 'white', fontSize: '130px' }}>Dating App</h3>
                    <h2 style={{ color: 'white' }}>Have Money, Got Honey</h2>


                    <Link to='/home'><button className='btn landingbtn'>Get Started</button></Link>
                </div>

            </div>
        </>
    )
}

export default LandingScreen