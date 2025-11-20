import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {auth } from "express-oauth2-jwt-bearer";
import User from "./models/User.js";
import mongoose from "mongoose";

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
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    tokenSigningAlg: 'RS256'
});


main()
    .then(() => {console.log('Connected to MongoDB')})
    .catch(err => console.log(`MongoDB: ${err}`));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

}

app.post('/api/protected', jwtCheck, async (req, res) => {
    console.log("TOKEN CLAIMES: ", req.auth);

    const auth0Id = req.auth.payload.sub;
    console.log("AUTH0ID: ", auth0Id);

    const {email, name} = req.body;

    try{
        let user = await User.findOne({auth0Id});

        if(!user){
            user = new User({auth0Id, email, name});
            await user.save();
            console.log("User saved to Database");
        } else {
            console.log("User already exist in DB");   
        }

        res.json({
            message: "Protected route accessed",
            tokenClaims: req.auth,       
            userInDB: user 
        });

    } catch(error){
        console.log("MongoDB Error:", e.message);
        res.status(500).json({ error: "Database error" });
    }
    
})



app.listen(port, () => {
    console.log(`Server is connected to port: ${port}`);
});

