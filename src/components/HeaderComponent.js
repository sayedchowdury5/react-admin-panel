import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode';
import { Container, Navbar, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoutComponent from './LogoutComponent';

const HeaderComponent = props => {
    let user;
    const token = localStorage.getItem('token');
    user = jwtDecode(token);

    return (
        <div>
            <Navbar expand="md" className="header">
                <Container className="py-4">
                    <Navbar.Brand className="text-white">
                        <Link to="/admin/dashboard" className="router-link text-white">TORAH FOR KINH</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle className="bg-white"/>
                    <Navbar.Collapse className="justify-content-between">
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />{' '}
                        {/* <img src ="http://localhost:3000/details/img/myImage.png" /> */}
                        <LogoutComponent logOut={props.logOut}/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

HeaderComponent.propTypes = {

}

export default HeaderComponent


