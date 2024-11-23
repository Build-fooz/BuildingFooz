import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/FoozFood`)
        console.log(`Connecting to ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1); // Exit process with failure status.

    }

}