import Axios from 'axios';

// Next we make an 'instance' of it
const axios = Axios.create({
// .. where we make our configurations
    baseURL: 'http://localhost:3000/api',
    //headers: {'x-auth-token': token}
});

// Also add/ configure interceptors && all the other cool stuff
axios.interceptors.request.use(request => {
     const token = localStorage.getItem("token"); 
    if (token) {
        request.headers["x-auth-token"] = token;
    }
    return request;
}, error => {
    //console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // Edit response config
    return response;
}, error => {
    //console.log(error);
    return Promise.reject(error);
});

export default axios;