import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance
const apiClient = axios.create({
    baseURL:API_URL,
    withCredentials:true, // Send cookies with requests
});

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async(error) => {
        const originalRequest = error.config;

        // If token is expired
        if(error.response.status === 401 && error.response.data.message === "Token expired"){
            try{
                // Atteempt to refresh the token
                const {data} = await axios.post (`${API_URL}/api/refresh-token`, {}, {withCredentials:true});

                // Set the new access token to headers for future requests
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

                // Retry the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return apiClient(originalRequest);
            } catch(err){
                console.error("Failed to refresh token", err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;