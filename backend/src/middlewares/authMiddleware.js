//make the routes as protected
//this middleware will interceptthe request and check the token and see if the user is authenticated thenonly it will allow the use to access those routes.

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  //whenever we get access token,and we want to make that route as a protected route...we needto pass the access token in the headers....we will use the Authorization and pass token as a Bearer and then pass the token and then fire the request
  //here we will stilll get the same same result after firing...we need to validate this token so that only authenticated users are able to access this route

  let token;
  let autheaders = req.headers.Authorization || req.headers.authorization;
  if (autheaders && autheaders.startsWith("Bearer")) {
    token = autheaders.split(" ")[1];

    if (!token) {
      return res.status(401).json({ messege: "No Token, authorization denied" });
    }
    //if we get the token we need to decode that token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("The decoded user is : ", req.user);
      next();

    } catch (error) {
      res.status(400).json({ messege: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "No authorization header" });
  }
}
export default verifyToken;