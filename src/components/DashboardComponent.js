import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Card, Image } from 'react-bootstrap';
import { useLocation } from 'react-router';
import CarouselComponent from './Carousel'

const DashboardComponent = props => {
    const location = useLocation();
    return (
        <div>
            <Row>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="mb-3">
                    <Card body className="p-3">
                        <h6>
                            <span className="section-title text-white px-4 py-1 rounded">Video</span>
                        </h6> <hr/>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="mb-3">
                    <Card body className="p-3">
                        <h6>
                            <span className="section-title text-white px-4 py-1 rounded">Audio</span>
                        </h6> <hr/>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="mb-3">
                    <Card body className="p-3">
                        <h6>
                            <span className="section-title text-white px-4 py-1 rounded">Book</span>
                        </h6> <hr/>
                        <CarouselComponent/>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} className="mb-3">
                    <Card body className="p-3">
                        <h6>
                            <span className="section-title text-white px-4 py-1 rounded">Users</span>
                        </h6> <hr/>
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                        <Image src={window.location.origin+'/images/user.jpeg'} alt="user image" width="50px" roundedCircle fluid />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

DashboardComponent.propTypes = {

}

export default DashboardComponent
