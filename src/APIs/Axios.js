import axios from 'axios'

const Axios = axios.create({
    // baseURL: "http://localhost:5000/",
    baseURL: "https://thevsoni-datingappbackend.onrender.com/",
})

export default Axios;
