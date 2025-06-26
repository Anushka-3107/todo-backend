import mongoose from "mongoose";

const DB_NAME = "todo-list"

const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB CONNECTION INITIATED : ${connectionInstance.connection.host}`)

    }
    catch(error){
        console.log('MONGODB CONNECTION ERROR', error)
    }
}


export default connectDB;