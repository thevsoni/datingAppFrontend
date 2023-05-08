import React, { useState, useEffect } from 'react'
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Axios from '../APIs/Axios';

const Frien = ({ provider, user }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pendingRequest, setpendingRequest] = useState();
    const unFriend = async () => {

        //firstly delete provider id from user friends and add this inside pending friends
        setpendingRequest("confirmed");

        //now delete this provider from friendsPending and put this inside friends of user
        try {
            const data = (await Axios.post('/api/auth/sendConfirmToPending', { userid: user._id, providerid: provider._id }, { headers: { "auth-token": localStorage.getItem('token') } })).data
        } catch (error) {
            console.log("error in doing confirm to pending in frien.js", error)
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
                        <p>State : {provider.state}</p>
                        <p>Dating Charge : {provider.datingCharge}</p>
                        <p>District : {provider.district}</p>
                    </b>
                    <div style={{ float: 'right' }}>

                        {!provider.friends.includes(user._id) ?
                            <button className='btn btn-primary m-2'>Pending</button>
                            :
                            <Link to={`/talkingRoom/${provider._id}`}>
                                <button className='btn btn-primary m-2'>Talk Now</button>
                            </Link>
                        }

                        <button className='btn btn-primary' onClick={handleShow}>view details</button>
                        {
                            provider.friends.includes(user._id) &&
                            (!pendingRequest &&
                                <button className='btn btn-primary m-2' onClick={unFriend}>unFriend</button>
                            )

                        }
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

export default Frien