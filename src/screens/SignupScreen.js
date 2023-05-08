import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../APIs/Axios';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

const SignupScreen = () => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [gender, setgender] = useState('male');
    const [age, setage] = useState();
    const [state, setstate] = useState();
    const [district, setdistrict] = useState();
    const [isProvider, setisProvider] = useState('false');
    const [currentStatus, setcurrentStatus] = useState('true');
    const [datingCharge, setdatingCharge] = useState();
    const [image, setimage] = useState('');



    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                phoneNumber,
                gender,
                age,
                state,
                district,
                isProvider,
                currentStatus,
                datingCharge: datingCharge ? datingCharge : 0,
                image
            }
            console.log("data is sending to backend")
            try {
                setloading(true);
                const result = (await Axios.post('/api/auth/signup', user)).data
                setloading(false);
                setsuccess(true);
                localStorage.setItem('token', result.authtoken);
                localStorage.setItem('name', result.name);

                console.log("user created successfully")

                setname('');
                setemail('');
                setpassword('');
                setcpassword('');
                setphoneNumber('');
                setdatingCharge('');
                setimage('');

                window.location.href = "/home";
            } catch (error) {
                console.log(" error in post req in signup", error)
                setloading(false)
                seterror(false)
            }
        }
        else {
            alert("pwd not matched");
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='registration successful' />)}
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type="text" className='form-control' placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="email" className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="number" className='form-control' placeholder='phoneNumber' value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />
                        <input type="password" className='form-control' placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input type="password" className='form-control' placeholder='confirm password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                        <div className='form-control'>
                            <label htmlFor="male">Gender  : Male</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="gender" id="male" value="male" onClick={(e) => { setgender(e.target.value); console.log(gender) }} />
                            <label htmlFor="female" style={{ marginLeft: '1rem' }}>Female</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="gender" id="female" value="female" onClick={(e) => { setgender(e.target.value); console.log(gender) }} />
                        </div>
                        <input type="Number" className='form-control' placeholder='Age' value={age} onChange={(e) => { setage(e.target.value) }} />

                        <input type="text" className='form-control' placeholder='state' value={state} onChange={(e) => { setstate(e.target.value) }} />
                        <input type="text" className='form-control' placeholder='district' value={district} onChange={(e) => { setdistrict(e.target.value) }} />

                        <div className='form-control'>
                            <label htmlFor="yes">isProvider  : Yes</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="isProvider" id="yes" value="true" onClick={(e) => { setisProvider(e.target.value); console.log(isProvider) }} />
                            <label htmlFor="no" style={{ marginLeft: '1rem' }}>No</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="isProvider" id="no" value="false" checked onClick={(e) => { setisProvider(e.target.value); console.log(isProvider) }} />
                        </div>

                        <input disabled={isProvider === 'false' ? true : false} type="number" className='form-control' placeholder='Dating Charge' value={datingCharge} onChange={(e) => { setdatingCharge(e.target.value) }} />

                        <input type="text" className='form-control' placeholder='imageUrl' value={image} onChange={(e) => { setimage(e.target.value) }} />

                        <div className='form-control'>
                            <label htmlFor="yess">Current Status  : online</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="currentStatus" id="yess" checked value="true" onClick={(e) => { setcurrentStatus(e.target.value); }} />
                            <label htmlFor="nos" style={{ marginLeft: '1rem' }}>offline</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="currentStatus" id="nos" value="false" onClick={(e) => { setcurrentStatus(e.target.value); }} />
                        </div>

                        <button className='btn btn-primary mt-3' onClick={register}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupScreen