import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import axios from '../axiosConfig';
import firebase from '../firebase/firebaseConfig';
import 'firebase/compat/storage';
import { Card, Form, Button } from 'react-bootstrap';

const AudioComponent = props => {
    const [state, setState] = useState({
        book_id:'',
        audio_description:'',
        audio_file_path:'',
    });

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get('/books').then( res => {
            setBookList(res.data.data);
        })
    }, [])

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
        const uploadTask = storageRef.child('podcast/' + fileName).put(file);

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

    const submitAudio = (e) =>{
        e.preventDefault();
        console.log('audio submit info = ',state);
        const data = new FormData();
        data.append('book_id', state.book_id)
        data.append('audio_description', state.audio_description)
        data.append('audio_path', state.audio_file_path)

        axios.post('/books/podcast', data).then( res => {console.log(res.data);})
    }
    return (
        <div>
            <Card body>
                <h6>
                    <span className="section-title text-white px-4 py-1 rounded">Audio Upload</span>
                </h6> <hr/>
                <Form onSubmit={submitAudio}>
                    <Form.Group className="mb-3" controlId="book_selection">
                        <Form.Label>Select Book</Form.Label>
                        <Form.Control 
                            name="book_id"
                            onChange={inputsHandler}
                            value={state.book_id}
                            as="select"
                            required
                        >
                            <option></option>
                            {bookList.map( (el, i) => {
                                return <option key={i} value={el.book_id}>{el.book_name}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="audio_description">
                        <Form.Label>Audio Description</Form.Label>
                        <Form.Control 
                            type="text"
                            name="audio_description"
                            onChange={inputsHandler}
                            value={state.audio_description}
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="audio_file" className="mb-3">
                        <Form.Label>Upload Audio File</Form.Label>
                        <Form.Control 
                            type="file"
                            name="audio_file_path"
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

AudioComponent.propTypes = {

}

export default AudioComponent
