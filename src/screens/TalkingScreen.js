import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Axios from '../APIs/Axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

const TalkingScreen = () => {

    const { providerId } = useParams();//this is provider
    //user in localstorage

    const [provider, setprovider] = useState();
    const [user, setuser] = useState();

    const [loading, setloading] = useState();
    const [error, seterror] = useState();


    useEffect(() => {
        async function fetchData() {
            try {

                //user
                console.log("fetching user data")
                setloading(true);
                let data = (await Axios.get('/api/auth/getUser', { headers: { "auth-token": localStorage.getItem('token') } })).data
                setuser(data)
                setloading(false);
                console.log("fetched data")

                //provider
                let data2 = (await Axios.get(`/api/auth/getUserById/${providerId}`)).data
                setprovider(data2)

            } catch (error) {
                seterror(true);
                setloading(false);
                console.log("error in talking room, to fetch data")
            }
        }
        fetchData();
    }, [])


    return (
        <div style={{ backgroundColor: "#b40000" }}>

            <div>TalkingScreen</div>
            <div className="container">
                <div className="row mt-5 bs justify-content-between">

                    {/* user */}
                    <div className="col-md-4 mt-5">
                        {loading && <Loader />}
                        {user && <>
                            <div className="col-md-9">
                                <img src={user.image} alt="unable to load " className='smallimg' />
                            </div>
                            <div className="col-md-5">
                                <h1>{user.name}</h1>
                                <b>
                                    <p>Age : {user.age}</p>
                                    <p>State : {user.state}</p>
                                    <p>District : {user.district}</p>
                                </b>
                            </div>
                        </>
                        }
                    </div>

                    {/* chatting option */}
                    <div className="col-md-2 mt-5 d-flex justify-content-center align-items-center" style={{ fontSize: '4em' }}>
                        <i class="fa-brands fa-rocketchat"></i>
                    </div>

                    {/* provider */}
                    <div className="col-md-4 mt-5">
                        {loading && <Loader />}
                        {provider &&
                            <>
                                <div className="col-md-9">
                                    <img src={provider.image} alt="unable to load " className='smallimg' />
                                </div>
                                <div className="col-md-5">
                                    <h1>{provider.name}</h1>
                                    <b>
                                        <p>Age : {provider.age}</p>
                                        <p>Dating Charge : {provider.datingCharge}</p>
                                        <p>State : {provider.state}</p>
                                        <p>District : {provider.district}</p>
                                        {provider.currentStatus === true && <button type="button" class="btn btn-primary">Online</button>}
                                        {provider.currentStatus === false && <button type="button" class="btn btn-secondary">Offline</button>}

                                    </b>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TalkingScreen