const jwt = require("jsonwebtoken");


const verifyUserToken = (req, res, next) => {
    

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
   

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     

    req.userId = decoded.userId;
   

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

const verifyAdminToken = (req, res, next) => {
    

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
   

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     

    req.adminId = decoded.adminId;
   

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};






module.exports = {verifyAdminToken,verifyUserToken};
