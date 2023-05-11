import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const LandingScreen = () => {

    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
        // window.location.href = "/home";
        navigate("/home");
    }

    return (
        <>
            <div className='landing'>

                <div className="col-md-12 text-center">

                    <h3 style={{ color: 'white', fontSize: '130px' }}>Dating App</h3>
                    <h2 style={{ color: 'white' }}>Have Money, Get Honey</h2>


                    <Link to='/home'><button className='btn landingbtn'>Get Started</button></Link>
                </div>

            </div>
        </>
    )
}

export default LandingScreen