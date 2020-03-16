import axios from 'axios';

const api = axios.create({
    //Url padrão quando subir o container docker do backend
    baseURL: 'http://192.168.99.100/'
})

export default api;