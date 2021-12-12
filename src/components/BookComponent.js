import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from '../axiosConfig';
import firebase from '../firebase/firebaseConfig';
import 'firebase/compat/storage';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useParams } from 'react-router';
import CarouselComponent from './Carousel';
const BookComponent = (props) => {
    const {id} = useParams();
    const urlSearchQuery = new URLSearchParams(useLocation().search); //urlSearchQuery.get("query name")
    const [book, setBook] = useState({
        book_name:'',
        book_description:'',
        video_description:'',
        video_path:'',
        chapters:[
            {
                chapter_no:'',
                chapter_name:'',
                chapter_description:'',
                chapter_audio_english:'',
                chapter_audio_vietnamise:''
            }
        ]
    });

    // useEffect(() => {
    //     axios.get('/books').then( res => {
    //         console.log("book list = ",res.data.data);
    //         setState(res.data.data);
    //     })
    // }, [])

    const fileUpload = ( event, folder, index ) => {
        const eventName = event.target.name;
        const timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
        const random = ("" + Math.random()).substring(2, 8); 
        const random_number = timestamp+random; //pick random number

        const file = event.target.files[0];
        const fileName = random_number + '_' + file.name; //make unique filename
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef.child(`${folder}/` + fileName).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                //this.setState({progress})
            },(error) => {
                throw error
            },() => {
                // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) =>{
        
                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                    if(eventName === "chapter_audio_english" || eventName === "chapter_audio_vietnamise")
                    {
                        const values = [...book.chapters];
                        values[index][eventName] = url;
                        setBook(prevState => ({
                            ...prevState,
                            chapters: values
                        }));
                    }
                    if(eventName === "video_path")
                    {
                        setBook(prevState => ({
                            ...prevState,
                            video_path: url
                        }));
                    }
                })
            }
        )
    }

    const handleDynamicChapterChange = (index, event) => {
        const eventName = event.target.name;
        if(eventName === "chapter_audio_english" || eventName === "chapter_audio_vietnamise")
        {
            const folder = 'book_chapter_audio'
            fileUpload(event, folder, index);
        } 
        if(eventName === "video_path")
        {
            const folder = 'video'
            fileUpload(event, folder);
        } else 
        {
            const values = [...book.chapters];
            values[index][eventName] = event.target.value;
            setBook(prevState => ({
                ...prevState,
                chapters: values
            }));
        }
    };

    const addMoreChapter = () => {
        const values = [...book.chapters];
        values.push({ chapter_no: '', chapter_name: '', chapter_description:'', chapter_audio_english:'', chapter_audio_vietnamise:'' });
        setBook(prevState => ({
            ...prevState,
            chapters: values
        }));
    };
    
    const removeChapter = index => {
        const values = [...book.chapters];
        values.splice(index, 1);
        setBook(prevState => ({
            ...prevState,
            chapters: values
        }));
    };

    const bookInputChange = (e) =>{
        const {name, value} = e.target;
        setBook(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitBook = (e) =>{
        e.preventDefault();
        console.log('book submit info = ',book);
        const data = new FormData();
        data.append('book_name', book.book_name)
        data.append('book_description', book.book_description)
        data.append('chapters', JSON.stringify(book.chapters))
        data.append('video_path', book.video_path)
        data.append('video_description', book.video_description)

        axios.post('/books', data).then( res => {console.log(res.data);})
    }

    return (
        <div>
            <Card body className="mb-3">
                <h6>
                    <span className="section-title text-white px-4 py-1 rounded">All Books</span>
                </h6> <hr/>
                {/* <CarouselComponent/> */}
            </Card>
            <Card body>
                <h6>
                    <span className="section-title text-white px-4 py-1 rounded">Book Upload</span>
                </h6> <hr/>
                <Form onSubmit={submitBook}>
                    <Form.Group className="mb-3" controlId="book_name">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control 
                            type="text"
                            name="book_name"
                            onChange={bookInputChange}
                            value={book.book_name} 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="book_description">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control 
                            type="text"
                            name="book_description"
                            onChange={bookInputChange}
                            value={book.book_description}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="video">
                        <Form.Label>Add Video Description</Form.Label>
                        <Form.Control 
                            type="text"
                            name="video_description"
                            onChange={bookInputChange} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="video">
                        <Form.Label>Add Video File</Form.Label>
                        <Form.Control 
                            type="file"
                            name="video_path"
                            onChange={e => handleDynamicChapterChange('', e)} 
                        />
                    </Form.Group>

                    <div className="text-center mb-3">
                        <h6>
                            <span className="section-title text-white px-4 py-1 rounded">Add Chapter</span>
                        </h6>
                    </div>
                    <> 
                        {book.chapters.map( (chapter, index) => (
                            <div key={index} className="p-3">
                                <Row className="p-2 border border-success d-flex align-items-center justify-content-center mb-3">
                                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                        <Form.Group>
                                            <Form.Label>Chapter No</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                min="1"
                                                step="1"
                                                name="chapter_no"
                                                onChange={ e => handleDynamicChapterChange(index, e)}
                                                required 
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Chapter Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="chapter_name"
                                                onChange={e => handleDynamicChapterChange(index, e)}
                                                required 
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Chapter Description</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                name="chapter_description"
                                                onChange={e => handleDynamicChapterChange(index, e)}
                                                required 
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Chapter Audio English</Form.Label>
                                            <Form.Control 
                                                type="file"
                                                name="chapter_audio_english"
                                                onChange={e => handleDynamicChapterChange(index, e)} 
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Chapter Audio Vietnamise</Form.Label>
                                            <Form.Control 
                                                type="file"
                                                name="chapter_audio_vietnamise"
                                                onChange={e => handleDynamicChapterChange(index, e)} 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs sm md lg={2} xl={2} xxl={2} className="text-center">
                                        <Button variant="outline-danger" disabled={index === 0} onClick={ () => removeChapter(index)}><FontAwesomeIcon icon={['far', 'trash-alt']} /></Button>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </><hr/>
                    <div className="d-flex justify-content-between">
                        <Button variant="outline-success" className="ml-auto" onClick={ () => addMoreChapter()}> Add More</Button>
                        <Button 
                            variant="info"
                            className="ml-5 text-white" 
                            type="submit"
                        > Submit</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

BookComponent.propTypes = {
    book_name: PropTypes.string,
}

export default BookComponent
