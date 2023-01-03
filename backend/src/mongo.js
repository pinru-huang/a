import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
export default {
 connect: () => { /* code to connect Mongoose DB */
    dotenv.config();
    mongoose.connect( process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     })
     .then((res) => console.log("mongo db connection created"));
    
}
};