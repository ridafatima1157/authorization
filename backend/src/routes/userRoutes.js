import express from "express";
const router = express.Router();

import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js"
//we have to make these three routes as protected so in order to do that we will only allow those users that are authenticated to access thes routes
//and we will authentciate the user based on the access token
//so we will writethe middleware in middleware folder

//only admin can access this route
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ messege: "Welcome admin" });
})

//only user can access this route(mean all can access it)
router.get("/user", verifyToken, authorizeRole("admin", "user"), (req, res) => {
  res.json({ messege: "Welcome user" });
})

export default router;