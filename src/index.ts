import express from 'express'; 
import { userRouter } from './Routes/user';
const app = express();

app.use(express.json());

app.use("api/v1/user", userRouter)

app.listen(5000, () : void => {
    console.log("Server is running")
} );