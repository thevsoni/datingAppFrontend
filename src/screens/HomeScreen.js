import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Axios from '../APIs/Axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Provider from '../components/Provider';


const HomeScreen = () => {


    const [user, setuser] = useState();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            async function fetchData() {
                try {
                    console.log("fetching user data in home screen")
                    const data = (await Axios.get('/api/auth/getUser', { headers: { "auth-token": localStorage.getItem('token') } })).data
                    setuser(data)
                    console.log("fetched data in home screen")
                    console.log("found the user data in home screen")
                } catch (error) {
                    console.log("error in, to fetch user data not provider data ", error)
                }
            }
            fetchData();
        }
    }, [])



    const [providers, setproviders] = useState([]);
    const [duplicateproviders, setduplicateproviders] = useState([]);
    const [duplicateprovidersState, setduplicateprovidersState] = useState([]);

    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const cg = ["korba", "bilashpur", "raipur"]
    const mh = ["mumbai", "nagpur", "nashik"]
    const del = ["north delhi", "new delhi", "south delhi"]
    //we can make array like this to run a map when have many areas ,but for now we can do hard code

    const [currState, setcurrState] = useState();
    const [currDistrict, setcurrDistrict] = useState();

    const [priceFilter, setpriceFilter] = useState();




    useEffect(() => {
        async function fetchData() {
            try {
                console.log("fetching data")
                setloading(true);
                const data = (await Axios.get('/api/auth/getAllProviders')).data
                if (localStorage.getItem('token')) {

                    try {
                        const cuser = (await Axios.get('/api/auth/getUser', { headers: { "auth-token": localStorage.getItem('token') } })).data
                        const data2 = data.filter((temp) => { return temp._id !== cuser._id })
                        setproviders(data2);
                        setduplicateproviders(data2)
                        setloading(false);
                        console.log("fetched data")
                    } catch (error) {
                        console.log("error in getuser all providers in filter ", error);
                    }
                }
                else {
                    setproviders(data)
                    setduplicateproviders(data)
                    setloading(false);
                    console.log("fetched data")
                }
            } catch (error) {
                seterror(true);
                setloading(false);
                console.log("error in, to fetch data")
            }
        }
        fetchData();
    }, [])

    function filterByState(state) {
        //run loop in duplicateproviders room
        if (state == "all") {
            setproviders(duplicateproviders);
        }
        else {

            const temp = duplicateproviders.filter(provide => provide.state.toLowerCase() === state.toLowerCase());
            setproviders(temp);
            setduplicateprovidersState(temp);
        }
        document.getElementById("pt").getElementsByTagName("option")[0].selected = 'selected';


    }


    function filterByDistrict(district) {

        // console.log(district)

        //run loop in providers room
        if (district === "all") {
            setproviders(duplicateprovidersState);
        } else {
            // console.log(duplicateprovidersState)
            const temp = duplicateprovidersState.filter(provide => provide.district.toLowerCase() === district.toLowerCase());
            setproviders(temp);
        }

        document.getElementById("pt").getElementsByTagName("option")[0].selected = 'selected';
    }

    function filterByPrice(type) {
        // console.log(type)
        let temp = providers;
        if (type === "descending") {
            temp.sort((a, b) => { return a.datingCharge - b.datingCharge });
        }
        if (type === "ascending") {
            temp.sort((a, b) => { return b.datingCharge - a.datingCharge });
        }
        setproviders(temp);
    }
    return (
        <>
            <div style={{ backgroundColor: "#b40000" }}>
                {!localStorage.getItem('token') && <Error message="Please Login To Talk With Someone" />}

                {loading && <Loader />}
                <div className="container">
                    <div className="row mt-5 bs">



                        {/* state filter */}
                        <div className="col-md-3">
                            <select className='form-control' onChange={(e) => { setcurrState(e.target.value); filterByState(e.target.value) }}>
                                <option value="all">all state</option>
                                <option value="chhattisgarh">chhattisgarh</option>
                                <option value="maharashtra">maharashtra</option>
                                <option value="delhi">delhi</option>
                            </select>
                        </div>


                        {/* district filter */}

                        {currState === "chhattisgarh" && <div className="col-md-3">
                            <select className='form-control' onChange={(e) => { filterByDistrict(e.target.value) }}>
                                <option value="all">all district</option>
                                <option value="korba">korba</option>
                                <option value="bilashpur">bilashpur</option>
                                <option value="raipur">raipur</option>
                            </select>
                        </div>
                        }

                        {currState === "maharashtra" && <div className="col-md-3">
                            <select className='form-control' onChange={(e) => { filterByDistrict(e.target.value) }}>
                                <option value="all">all</option>
                                <option value="nashik">nashik</option>
                                <option value="nagpur">nagpur</option>
                                <option value="mumbai">mumbai</option>
                            </select>
                        </div>
                        }

                        {currState === "delhi" && <div className="col-md-3">
                            <select className='form-control' onChange={(e) => { filterByDistrict(e.target.value) }}>
                                <option value="all">all</option>

                                <option value="new delhi">new delhi</option>
                                <option value="north delhi">north delhi</option>
                                <option value="south delhi">south delhi</option>
                            </select>
                        </div>
                        }

                        {/* price filter */}
                        {/* {providers && <div className="col-md-3">
                            <select className='form-control' id='pt' onChange={(e) => { setpriceFilter(e.target.value); filterByPrice(e.target.value) }}>
                                <option value="normal">default prices filter</option>
                                <option value="ascending">ascending</option>
                                <option value="descending">descending</option>
                            </select>
                        </div>
                        } */}
                    </div>
                    <div className='justify-content-center mt-5'>
                        {providers && providers.map((provider, key) => {
                            return <div key={key} className="col md-9 mt-2">
                                <Provider provider={provider} user={user} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeScreen