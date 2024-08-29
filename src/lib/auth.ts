import axios, { type AxiosRequestConfig } from "axios";
import { tokenS } from "./stores.js";
import { get } from "svelte/store";
import { error } from "@sveltejs/kit";

const api = axios.create({
  baseURL: 'http://localhost:8000/',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>{
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response?.status === 401){
      localStorage.setItem('access_token', "")
    }
    return Promise.reject(error)
  }
)

export default api;

// export function authInterceptor() {
//     axios.interceptors.request.use((config: AxiosRequestConfig) => {
//       const { accessToken } = sessionService;
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//         config.withCredentials = true;
//         logMessage(`${prefixReq} 🔑 Auth`, [`Adding Auth header`]);
//       } else {
//         logMessage(`${prefixReq} 🔑 Auth`, [`No Auth Token to add`]);
//       }
  
//       return config;
//     });
  
//     axios.interceptors.response.use(
//       (response: AxiosResponse) => response,
//       (error: AxiosError) => {
//         if (error.response.status === 401) {
//           const authHeader = error.config.headers['WWW-Authenticate'];
//           if (/is expired/.test(authHeader)) {
//             navigate('/signin');
//           } else {
//             navigate('/authfailed');
//           }
//           return Promise.resolve(true);
//         }
//         return Promise.reject(error);
//       },
//     );
//   }