import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SidebarComponent = props => {
  const bgColor = {backgroundColor:'#ffde24', color:'#3d3d3d'};
  const Color = {color:'white'};

  let user;
  const token = localStorage.getItem('token');
  user = jwtDecode(token);

    return (
        <div>
            <Card body className="mb-3 text-center">
              <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="100px" roundedCircle fluid /><br/>
              <h5>Welcome {user.first_name + ' ' + user.last_name}</h5>
              <p>Sun, 29 Nov 2022</p>
            </Card>
            <Card body className="p-3">
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="border py-5 text-center rounded" style={bgColor}>
                  <Link to="dashboard" className="router-link" style={Color}>
                    <FontAwesomeIcon icon={['fas', 'home']} /> <br/>
                    Dashboard
                  </Link>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="border py-5 text-center rounded">
                  <Link to="book" className="router-link text-dark">
                    <FontAwesomeIcon icon={['fas', 'book-open']} /> <br/>
                    Book Upload
                  </Link>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="border py-5 text-center rounded">
                  <Link to="audio" className="router-link text-dark">
                    <FontAwesomeIcon icon={['fas', 'music']} /> <br/>
                    Audio Upload
                  </Link>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="border py-5 text-center rounded">
                  <Link to="video" className="router-link text-dark">
                    <FontAwesomeIcon icon={['fas', 'video']} /> <br/>
                    Video Upload
                  </Link>                
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="border py-5 text-center rounded">
                  <Link to="profile" className="router-link text-dark">
                    <FontAwesomeIcon icon={['fas', 'user-friends']} /> <br/>
                    Profile
                  </Link>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="border py-5 text-center rounded">
                  <Link to="user" className="router-link text-dark">
                    <FontAwesomeIcon icon={['fas', 'user-cog']} /> <br/>
                    Users
                  </Link>
                </Col>
              </Row>
            </Card>
        </div>
    )
}

SidebarComponent.propTypes = {

}

export default SidebarComponent
