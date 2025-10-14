const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = authHeader && authHeader.split(" ")[0]; // BUG: Should be [1], not [0]

  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }
  console.log("Token recebido:", token); // Log do token recebido

  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findById(verified.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido!"] });
  }
};

module.exports = authGuard;
