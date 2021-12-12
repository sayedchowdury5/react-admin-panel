import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Breadcrumb, Card } from 'react-bootstrap';

const BreadcumbComponent = props => {
    return (
        <div>
            <Card body>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/" active>
                        Dashboard
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="text-center"><h6>Admin Dashboard</h6></div>
            </Card>
        </div>
    )
}

BreadcumbComponent.propTypes = {

}

export default BreadcumbComponent
