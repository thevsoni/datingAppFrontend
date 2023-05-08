import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../APIs/Axios';
import FrienPending from '../components/FrienPending';


import Loader from '../components/Loader';
import Error from '../components/Error';

const FriendsPending = () => {


    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const [pendingRequest, setpendingRequest] = useState([]);

    const [user, setuser] = useState();

    useEffect(() => {
        async function func() {
            let data = (await Axios.get('/api/auth/getUser', { headers: { "auth-token": localStorage.getItem('token') } })).data;
            setuser(data);
            // console.log(data);
        }
        func();
    }, [])

    useEffect(() => {

        if (user) {
            let arr = [];
            async function func() {
                setloading(true);
                for (let i = 0; i < user.friendsPending.length; i++) {
                    if (user.friendsPending[i].length < 1) {
                        continue;
                    }
                    try {
                        let friend = (await Axios.get(`/api/auth/getUserById/${user.friendsPending[i]}`)).data
                        arr.push(friend);
                    } catch (error) {
                        console.log("error in friends pending fetching data ", error);
                    }
                }
                setpendingRequest(arr);
                setloading(false);
            }

            func();
        }
    }, [user])

    return (
        <>
            <div>FriendsPending</div>
            {loading && <Loader />}
            {loading === false && (pendingRequest.length === 0 && <h2>you do not have any friend request </h2>)}
            {error && <Error message="something went wrong" />}
            <div className="container">
                <div className='justify-content-center mt-5'>
                    {pendingRequest && pendingRequest.map((provider, key) => {
                        return <div key={key} className="col md-9 mt-2">
                            <FrienPending provider={provider} user={user} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default FriendsPending