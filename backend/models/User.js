import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    auth0Id: { 
        type: String, 
        required: true, 
       
    },
    email: String,
    name: String,
});

const User = mongoose.model('User', userSchema);

export default User;