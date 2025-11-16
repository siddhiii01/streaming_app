import axios from "axios";
const API_URL = "http://localhost:5000";

export const makeAuthRequest = async (getAccessTokenSilently,endpoint,options ={} ) => {
    try{
        console.log(endpoint)
        console.log("Requesting Accessing token from auth0: ");
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: "read:all"
            },
        });

        console.log(`Recived access token: ${token}`);
        console.log(`Sending token to backend: ${API_URL}/${endpoint}`);

        const response = await axios.get(`${API_URL}/${endpoint}`, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
        });

        console.log(`Backend response status: ${response.status}`);
        console.log(`Backend response data:`, response.data);

        return response.data;

    }catch(error){
        console.log("Auth request failed: ", error);
        throw error;
    }
}