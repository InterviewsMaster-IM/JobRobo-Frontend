import axios from 'axios';

const rootUrl = process.env.REACT_APP_ROOT_URL;

const apiService = axios.create({
    baseURL: rootUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to inject the token to requests
apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Export the service for other APIs
export default apiService;