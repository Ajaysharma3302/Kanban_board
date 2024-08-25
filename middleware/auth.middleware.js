const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

const BlacklistModel = require("../models/blacklist.model");

const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!req.headers.authorization) {
    res.status(403).json({ message: "token not found" });
  }
  const blacklistedToken = await BlacklistModel.findOne({ token });

  if (blacklistedToken) {
    return res.status(403).json({ message: "Token is blacklisted" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY1);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token login again" });
    }
    const user = await UserModel.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(503).json({ message: "invalid token" });
  }
};

module.exports = authmiddleware;
