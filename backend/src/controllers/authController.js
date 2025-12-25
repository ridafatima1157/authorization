import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    //these names within the object should be equal to the name withing the user schema
    const { username, password, role } = req.body;
    //10 is the salt rounds → how many times bcrypt processes the password. Higher = more secure but slower. 10 is the standard balance.
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ messege: `User registered with username ${username}` })
  } catch (error) {
    res.status(500).json({ messege: `Something went wrong` })
  }

}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    //findOne is a Mongoose method that returns the first document from the database that matches a given query.
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ messege: `User with username ${username} not found` })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      //400 client site error
      return res.status(400).json({ messege: "Something went wrong" })
    }
    //we will generate a token and it give it back as a response to the user
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });


  } catch (error) {
    return res.status(500).json({ messege: `Something went wrong` })
  }

}