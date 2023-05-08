import React, { useState } from 'react'
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import axios from 'axios';
import Axios from '../APIs/Axios';


const Provider = ({ provider, user }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isOr, setisOr] = useState("Friend Request");

    const sendFriendRequest = async () => {

        if (isOr !== 'Pending') {

            try {
                const data = (await Axios.post('/api/auth/sendFriendRequest', { userid: user._id, providerid: provider._id }, { headers: { "auth-token": localStorage.getItem('token') } })).data
                if (data) {
                    setisOr("Pending");
                }
            } catch (error) {
                console.log("something error in sending friend Request ", error);
            }
        }
    }

    //if anyone sent me a friend request so , here also i can accept their request.from this ,
    //the provider id who sent me request which is inside my friendsPending will be deleted and will add inside 
    //my friends
    const [confirmRequest, setconfirmRequest] = useState();
    const confirmed = async () => {
        setconfirmRequest("confirmed");

        //now delete this provider from friendsPending and put this inside friends of user
        try {
            const data = (await Axios.post('/api/auth/sendPendingToConfirm', { userid: user._id, providerid: provider._id }, { headers: { "auth-token": localStorage.getItem('token') } })).data
        } catch (error) {
            console.log("error in doing pending to confirm in provider.js", error)
        }
    }

    return (
        <>
            <div className='row bs'>
                <div className="col-md-4">
                    <img src={provider.image} alt="unable to load " className='smallimg' />
                </div>
                <div className="col-md-7">
                    <h1>{provider.name} {provider.isVerified === true && <i className="fa-solid fa-check" style={{ color: "white", backgroundColor: "green", fontSize: "1.5rem" }}></i>} </h1>
                    <b>
                        <p>Age : {provider.age}</p>
                        <p>Dating Charge : {provider.datingCharge}</p>
                        <p>State : {provider.state}</p>
                        <p>District : {provider.district}</p>
                    </b>
                    <div style={{ float: 'right' }}>

                        {user ?
                            (provider.friends.includes(user._id) ?
                                (
                                    user.friends.includes(provider._id) ?
                                        <Link to={`/talkingRoom/${provider._id}`}>
                                            <button className='btn btn-primary m-2'>Talk Now</button>
                                        </Link>
                                        :
                                        ((!confirmRequest &&
                                            <button className='btn btn-primary m-2' onClick={confirmed}>Accept Friend Request</button>
                                        )
                                            ||
                                            ((confirmRequest &&
                                                <Link to={`/talkingRoom/${provider._id}`}>
                                                    <button className='btn btn-primary m-2'>Talk Now</button>
                                                </Link>
                                            ))

                                        )
                                )
                                : (user.friends.includes(provider._id) ? <button className='btn btn-primary m-2'>Pending</button>
                                    : <button className='btn btn-primary m-2' onClick={sendFriendRequest}>{isOr}</button>)
                            )

                            : <button disabled={true} className='btn btn-primary m-2' style={{ cursor: 'not-allowed' }}>Friend Request</button>}

                        <button className='btn btn-primary' onClick={handleShow}>view details</button>
                    </div>
                </div>

                {/* this code is for modal popup */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{provider.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel prevLabel='' nextLabel=''>
                            {
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 bigimg"
                                        src={provider.image}
                                        alt="First slide"
                                        style={{ height: "300px" }}
                                    />
                                </Carousel.Item>
                            }

                        </Carousel>
                        {/* <p>{provider.description}</p> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </>
    )
}

export default Provider