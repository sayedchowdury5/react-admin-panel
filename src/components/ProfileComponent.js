import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import axios from '../axiosConfig';
import firebase from '../firebase/firebaseConfig';
import 'firebase/compat/storage';
import { Card, Form, Button } from 'react-bootstrap';

const ProfileComponent = props => {
    const [state, setState] = useState({
        user_first_name:'',
        user_last_name:'',
        user_email:'',
        user_password:'',
        user_picture_file:'',
    });

    const inputsHandler = (e) =>{
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const fileUpload = ( event ) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
        const random = ("" + Math.random()).substring(2, 8); 
        const random_number = timestamp+random; //pick random number

        const file = event.target.files[0];
        const fileName = random_number + '_' + file.name; //make unique filename
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef.child('users_profile/' + fileName).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                //this.setState({progress})
            },(error) => {
                throw error
            },() => {
                // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
        
                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                    const {name} = event.target;
                    setState(prevState => ({
                        ...prevState,
                        [name]: url
                    }));
                })
            }
        )
    }

    const submitUser = (e) =>{
        e.preventDefault();
        console.log('user submit info = ',state);
        const data = new FormData();
        data.append('user_first_name', state.user_first_name)
        data.append('user_last_name', state.user_last_name)
        data.append('user_email', state.user_email)
        data.append('user_password', state.user_password)
        data.append('user_picture_path', state.user_picture_file)

        axios.post('/admin/profile', data).then( res => {console.log(res.data);})
    }
    return (
        <div>
            <Card body>
                <h6>
                    <span className="section-title text-white px-4 py-1 rounded">My Profile</span>
                </h6> <hr/>
                <Form onSubmit={submitUser}>
                    <Form.Group className="mb-3" controlId="user_first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="user_first_name"
                            onChange={inputsHandler}
                            value={state.user_first_name} 
                            placeholder="Enter first name..." 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="user_last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="user_last_name"
                            onChange={inputsHandler}
                            value={state.user_last_name} 
                            placeholder="Enter last name..." 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="user_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            name="user_email"
                            onChange={inputsHandler}
                            value={state.user_email} 
                            placeholder="Enter email..." 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="user_password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="user_password"
                            onChange={inputsHandler}
                            value={state.user_password} 
                            placeholder="Enter password..." 
                        />
                    </Form.Group>

                    <Form.Group controlId="user_file" className="mb-3">
                        <Form.Label>Upload Profile Picture</Form.Label>
                        <Form.Control 
                            type="file"
                            name="user_picture_file"
                            onChange={fileUpload} 
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button 
                            variant="info"
                            className="text-white" 
                            type="submit"
                        > Submit</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

ProfileComponent.propTypes = {

}

export default ProfileComponent
