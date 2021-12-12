import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../App.css';
import HeaderComponent from './HeaderComponent';
import SidebarComponent from './SidebarComponent';
import { Row, Col, Container } from 'react-bootstrap';
import BreadcumbComponent from './BreadcumbComponent';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminpanelLayout = (props) => {
    return (
        <div>
            <HeaderComponent logOut={props.logOut}/>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-3">
                        
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={3} className="mb-3">
                        <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="mb-3">
                            <BreadcumbComponent/>
                        </Col>
                        <Col>
                            <SidebarComponent/>
                        </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

AdminpanelLayout.propTypes = {

}

export default AdminpanelLayout
