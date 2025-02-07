import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

export default authorize;
