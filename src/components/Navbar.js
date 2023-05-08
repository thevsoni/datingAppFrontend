import React from 'react'

import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate();
    const username = localStorage.getItem('name');

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        // window.location.href = '/home'
        navigate("/home")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">DatingApp</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="fa-solid fa-bars" style={{ color: "white" }}></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-5">


                        {
                            username ?
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa-solid fa-user" style={{ marginRight: "5px" }}></i>{username}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <Link className="dropdown-item" to="/profile">Profile</Link>
                                        <Link className="dropdown-item" to="/friends">Friends</Link>
                                        <Link className="dropdown-item" to="/friendsPending">Friends Pending</Link>
                                        <Link className="dropdown-item" to="/" onClick={logout}>Logout</Link>
                                    </div>
                                </div>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                        }
                    </ul>


                </div>
            </nav>
        </>
    )
}

export default Navbar
