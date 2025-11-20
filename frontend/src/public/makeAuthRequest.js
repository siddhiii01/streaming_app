import axios from "axios"; //imported to make HTTP Request 
const API_URL = "http://localhost:5000";

//getAccssTokenSilently -> used to fecth token from Auth0
//here endpoint -> on which route the access route should be verifed
//options: extra axios config 
export const makeAuthRequest = async (getAccessTokenSilently,endpoint,options ={}) => {
    try{
        //console.log("Requesting Accessing token from auth0: ");
        const access_token = await getAccessTokenSilently({
            authorizationParams: {
                //here auidenece tells which API to access 
                //Every Access Token in Auth0 must be issued FOR a specific API.
                audience: import.meta.env.VITE_AUTH0_AUDIENCE
            },
        });

        // Decode the JWT payload for debugging
        //const payload = JSON.parse(atob(access_token.split(".")[1]));

        // console.log("Received Access Token:", access_token);
        // console.log("Token Payload:", payload);
        // console.log(`Sending Access Token to Backend: ${API_URL}/${endpoint}`);
        const response = await axios({
            url: `${API_URL}/${endpoint}`,
            method: options.method || 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-type": "application/json",
                ...options.headers
            },
            data: options.data || null,
        });

        // console.log(`Backend response status: ${response.status}`);
        // console.log(`Backend response data:`, response.data);

        return response.data;

    }catch(error){
        console.log("Auth request failed: ", error);
        throw error;
    }
}

//ACCESS TOKEN IS A JWT HERE
//AND JWT HAS 3 PARTS -> header.payload.signature
//In PAYLOAD -> actual data is present user, audidenc.... -> and it is BASE64 encoded JSON
//Payload = the middle section of the JWT, containing all user-related data and token metadata