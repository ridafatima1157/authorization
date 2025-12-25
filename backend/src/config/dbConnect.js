//config is going to help us have the database connection
import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`Database connected: ${connect.connection.host} ${connect.connection.name}`);
    //➡️ If the connection succeeds, logs a success message:
    //connect.connection.host → the MongoDB server host (like localhost or Atlas cluster).
    // connect.connection.name → the database name you connected to.
  } catch (error) {
    console.log(error);
    process.exit(1);
    //process.exit() → ends the Node.js process.
    //0 → means success (everything ran fine).
    //1 (or any non-zero) → means error (something went wrong).
  }
}
export default dbConnect;