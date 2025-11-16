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

//Parse Json 
app.use(express.json()); //required to read req.body POST , PUT, PATCH 

//Custom Logger Middleware
app.use((req,res, next) => {
    console.log("Incoming request: ");
    console.log(`req.method: ${req.method}`);
    console.log(`req.headers: ${JSON.stringify(req.headers)}`);
    console.log(`req.url: ${req.url}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    next();
});

//JWT using Auth0
const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    tokenSigningAlg: 'RS256'
});

//Testing Route
// app.get('/', (req,res) => {
//     res.send('server with cors')
// })

//testing Route w-out auth0
app.get('/api/check', (req,res) => {
    res.json({
        message: "No auth on this route"
    });
})

//tetsing Route with auth0
//this route will fail bcoz we have not defined anything on frontend for sending token to backedn
app.get('/api/protected/', jwtCheck, (req,res) => {
    res.json({
        message: 'Proctected route accessed',
        auth: req.auth //created by auth middleware
        //req.auth -> if user is logged in it contains user information
        //if user is not logged in it becomes undefined or user is NOT authenticated
    })
})

// Apply only to protected routes, not global


app.listen(port, () => {
    console.log(`Server is connected to port: ${port}`);
});

