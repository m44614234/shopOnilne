import mongoose from "mongoose";


const ConnectToDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect to DB Successfully :))");
    } catch (error) {
        console.log("error =>", error);
    }
}
export default ConnectToDB