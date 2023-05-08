import React, { useState, useEffect } from 'react'
import Frien from '../components/Frien';
import axios from 'axios';
import Axios from '../APIs/Axios';

import Loader from '../components/Loader';
import Error from '../components/Error';

const Friends = () => {


    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const [connectedFriends, setconnectedFriends] = useState([]);

    const [user, setuser] = useState();

    useEffect(() => {
        async function func() {
            try {

                let data = (await Axios.get('/api/auth/getUser', { headers: { "auth-token": localStorage.getItem('token') } })).data;
                setuser(data);
                // console.log(data);
            } catch (error) {
                console.log("error in getting user ", error)
            }
        }
        func();
    }, [])

    useEffect(() => {

        if (user) {
            let arr = [];
            async function func() {
                setloading(true);
                for (let i = 0; i < user.friends.length; i++) {
                    if (user.friends[i].length < 1) {
                        continue;
                    }
                    try {
                        let friend = (await Axios.get(`/api/auth/getUserById/${user.friends[i]}`)).data
                        arr.push(friend);
                    } catch (error) {
                        console.log("something error in getting friends ", error)
                    }
                }
                setconnectedFriends(arr);
                setloading(false);
            }

            func();
        }
    }, [user])

    return (
        <>
            <div>Your Friends</div>
            {loading && <Loader />}
            {error && <Error message="something error" />}
            {loading === false && (connectedFriends.length === 0 && <h2>you do not have any friend. make friends and enjoy </h2>)}

            {error && <Error message="something went wrong" />}
            <div className="container">
                <div className='justify-content-center mt-5'>
                    {connectedFriends && connectedFriends.map((provider, key) => {
                        return <div key={key} className="col md-9 mt-2">
                            <Frien provider={provider} user={user} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Friends