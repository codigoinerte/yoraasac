import axios, { AxiosRequestHeaders } from 'axios';
// import { getEnvVariables } from '../helpers';

// const { VITE_API_URL } = getEnvVariables()

// const config = {
//     baseURL: import.meta.env.VITE_API_URL, //VITE_API_URL,
//     headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//     }
// };

const config = {
    baseURL: import.meta.env.VITE_API_URL        
};

export const backendApi = axios.create(config);

// Todo: configurar interceptores
backendApi.interceptors.request.use( (config) => {

    config.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return config;
})


export default backendApi;



