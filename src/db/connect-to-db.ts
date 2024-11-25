import mongoose from "mongoose"
export const connectToDB = async()=>{
    const uri = process.env.MONGO_URI
    if(!uri) throw new Error('MONGO_URI not found')
    try {
       const {connection} = await mongoose.connect(uri)
       connection.on("connection", ()=>console.log("Mongodb connected successfully!"))
       connection.on("error", err=>console.error(err))
    } catch (error) {
       console.error("failed to connect to mongodb", error) 
       process.exit(1)
    }
}