import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) return res.status(401).json({ message: "Access token missing" });

  try {
    const secret = process.env.JWT_SECRET || "change-me";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
