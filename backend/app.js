import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {auth} from "express-oauth2-jwt-bearer";
import User from "./models/User.js";

dotenv.config();

const app = express();
const port = process.env.PORT;



//Connecting to frontend
//Middleware
app.use(cors({
  origin: 'http://localhost:5173', // React Dev Server
  credentials: true
}));

//JWT using Auth0
const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    tokenSigningAlg: 'RS256'
});



// Apply only to protected routes, not global


app.listen(port, () => {
    console.log(`Server is connected to port: ${port}`);
});

