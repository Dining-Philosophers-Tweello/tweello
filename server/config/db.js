import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        console.log("MONGO URI IS", process.env.MONGO_URI);
        //const uri = provess.env.MONGO_URI;
        const uri = "mongodb+srv://tweelloDB:3r0MbFph6HaUU8hv@tweello.qnufuue.mongodb.net/?retryWrites=true&w=majority";
        //const conn = await mongoose.connect(process.env.MONGO_URI);        
        const conn = await mongoose.connect(uri);   
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;