import express from 'express'; 
import { userRouter } from './Routes/user';
import mongoose, { mongo } from 'mongoose';
const app = express();

app.use(express.json());

const main = async () => {

    try {

    await mongoose.connect("mongodb+srv://Arav_menon:UGMeIo8G4nva9xRj@cluster0.cbwjn.mongodb.net/Brainly");
    console.log("Conneted ti mongoDB");
    
    app.listen(5000, () : void => {
        console.log("Server is running")
    });

    }catch(error) {
        console.log("Database error");
        process.exit(1)
    }
    
}

main()

app.use("api/v1/user", userRouter)
