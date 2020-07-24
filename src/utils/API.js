import axios from 'axios'

export default axios.create({
    baseURL:'https://trafalmarsreminder.firebaseio.com/',
    responseType: "json",
})