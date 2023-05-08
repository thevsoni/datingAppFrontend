import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../APIs/Axios';
import { useNavigate } from 'react-router-dom'


import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

const Loginscreen = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function login() {
        const user = {
            email,
            password
        }
        console.log("sending data to backend")

        try {
            setloading(true);
            const result = (await Axios.post('/api/auth/login', user)).data
            setloading(false);
            console.log("user created successfully")
            setsuccess(true);

            localStorage.setItem('token', result.authtoken);
            localStorage.setItem('name', result.name);

            // window.location.href = '/home';
            navigate("/home");
        } catch (error) {
            console.log("error in login ", error)

            setloading(false);
            seterror(true);
        }

    }
    return (
        <div>
            {loading && <Loader />}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">

                    {error && <Error message='invalid credentials or something went wrong' />}
                    {success && <Success message="login successfully" />}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input type="email" className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="password" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

                        <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen