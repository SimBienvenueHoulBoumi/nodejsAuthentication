import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!process.env.JWT_SECRET) {
      return res.status(500).send("JWT_SECRET is not defined");
    }
    Jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authMiddleware;
