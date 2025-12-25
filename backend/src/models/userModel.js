//A userModel file defines the MongoDB schema and model for users, specifying how user data is structured and stored in the database.
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  //define all the properties here
  username: {
    type: String,
    required: true,  //must be provided when creating the doc
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    //enum restricts a field’s value to a predefined set of choices
    enum: ["admin", "user"],
  },
}, {
  timestamps: true, //automatically adds and manages createdAt and updatedAt fields in the document.
})
export default mongoose.model("User", userSchema);