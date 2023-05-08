import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../APIs/Axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';



const ProfileScreen = () => {

    //here like signup , we will show every thing and user can update their data
    const [user, setuser] = useState();

    const [loading, setloading] = useState();
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [phoneNumber, setphoneNumber] = useState();
    const [gender, setgender] = useState();
    const [age, setage] = useState();
    const [isProvider, setisProvider] = useState();
    const [currentStatus, setcurrentStatus] = useState();
    const [datingCharge, setdatingCharge] = useState();
    const [image, setimage] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("fetching user data")
                setloading(true);
                const data = (await Axios.get('/api/auth/getUser', { headers: { "auth-token": localStorage.getItem('token') } })).data
                setuser(data)
                setloading(false);
                console.log("fetched data")

                setname(data.name);
                setemail(data.email);
                setphoneNumber(data.phoneNumber);
                setgender(data.gender);
                setage(data.age);
                setisProvider(data.isProvider);
                setcurrentStatus(data.currentStatus);
                setimage(data.image);
                setdatingCharge(data.datingCharge);

                if (data.isProvider === true) {
                    document.getElementById('yes').click();
                } else {
                    document.getElementById('no').click();
                }


                if (data.gender === 'male') {
                    document.getElementById('male').click();
                } else {
                    document.getElementById('female').click();
                }

                // console.log(data);
                // console.log(data.currentStatus);

                if (data.currentStatus === true) {
                    document.getElementById('yess').click();
                } else {
                    document.getElementById('nos').click();
                }
            } catch (error) {
                seterror(true);
                setloading(false);
                console.log("error in, to fetch data", error)
            }
        }
        fetchData();
    }, [])



    async function register() {
        const user = {
            name,
            email,
            phoneNumber,
            gender,
            age,
            isProvider,
            currentStatus,
            datingCharge: datingCharge ? datingCharge : 0,
            image
        }
        console.log("data is sending to backend")
        try {
            setloading(true);
            const result = (await Axios.post('/api/auth/updateUser', user, { headers: { "auth-token": localStorage.getItem('token') } })).data
            setloading(false);
            setsuccess(true);
            localStorage.setItem('name', result.name);

            console.log("user updated successfully")

        } catch (error) {
            console.log(" error in post req in signup", error)
            setloading(false)
            seterror(false)
        }

    }
    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error message="something error" />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    {success && (<Success message='updation successful' />)}
                    <div className='bs'>
                        <h2>Profile</h2>
                        <input type="text" className='form-control' placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input type="email" className='form-control' placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="number" className='form-control' placeholder='phoneNumber' value={phoneNumber} onChange={(e) => { setphoneNumber(e.target.value) }} />

                        <div className='form-control'>
                            <label htmlFor="male">Gender  : Male</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="gender" id="male" value="male" onClick={(e) => { setgender(e.target.value); console.log(gender) }} />
                            <label htmlFor="female" style={{ marginLeft: '1rem' }}>Female</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="gender" id="female" value="female" onClick={(e) => { setgender(e.target.value); console.log(gender) }} />
                        </div>
                        <input type="Number" className='form-control' placeholder='Age' value={age} onChange={(e) => { setage(e.target.value) }} />

                        <div className='form-control'>
                            <label htmlFor="yes">isProvider  : Yes</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="isProvider" id="yes" value="true" onClick={(e) => { setisProvider(e.target.value); console.log(isProvider) }} />
                            <label htmlFor="no" style={{ marginLeft: '1rem' }}>No</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="isProvider" id="no" value="false" onClick={(e) => { setisProvider(e.target.value); console.log(isProvider); setdatingCharge(0); }} />
                        </div>

                        <input disabled={isProvider === 'false' ? true : false} type="number" className='form-control' placeholder='Dating Charge' value={datingCharge} onChange={(e) => { setdatingCharge(e.target.value) }} />

                        <input type="text" className='form-control' placeholder='imageUrl' value={image} onChange={(e) => { setimage(e.target.value) }} />

                        <div className='form-control'>
                            <label htmlFor="yess">Current Status  : online</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="currentStatus" id="yess" value="true" onClick={(e) => { setcurrentStatus(e.target.value); }} />
                            <label htmlFor="nos" style={{ marginLeft: '1rem' }}>offline</label>
                            <input type="radio" style={{ marginLeft: '.4rem' }} name="currentStatus" id="nos" value="false" onClick={(e) => { setcurrentStatus(e.target.value); }} />
                        </div>

                        <button className='btn btn-primary mt-3' onClick={register}>update profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen