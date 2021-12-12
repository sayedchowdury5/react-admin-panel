import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../axiosConfig'
import { Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const LoginComponent = () => {
    const [state, setState] = useState({
        user_email:'',
        user_password:''
    });
     const navigate = useNavigate();
    // const location = useLocation();
    // let from = location.state?.from?.pathname || "/";

    const inputsHandler = (e) =>{
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitUser = (e) =>{
        e.preventDefault();
        const data = new FormData();
        data.append('user_email', state.user_email)
        data.append('user_password', state.user_password)

        axios.post('/admin/login', data).then( res => {
            localStorage.setItem('token', res.data)
            navigate("/admin/dashboard", {replace:true});
        })
    }
    
    return (
        <div className="login-page">
            <Card body>
                <h5 className="text-center">
                    <span>Admin Login</span>
                </h5> <hr/>
                <Form onSubmit={submitUser}>
                    <Form.Group className="mb-3" controlId="user_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            name="user_email"
                            onChange={inputsHandler}
                            value={state.user_email} 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="user_password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="user_password"
                            onChange={inputsHandler}
                            value={state.user_password} 
                            required
                        />
                    </Form.Group>

                    <ButtonGroup className="d-flex">
                        <Button
                            variant="outline-info"
                            className="btn-block mr-1 mt-1" 
                            type="submit"> 
                            Login
                        </Button>
                    </ButtonGroup>
                </Form>
            </Card>
        </div>
    )
}

LoginComponent.propTypes = {

}

export default LoginComponent
