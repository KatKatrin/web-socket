import jwt  from "jsonwebtoken";

import secret from "../config";

function checkToken (req, res, next) {

    if (req.method === "OPTIONS") {
      next()
    }

    try {
      
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(403).json({message: "User do not authorized"})
        }

        const decodedData = jwt.verify(token, secret)
  
        req.userDecodedData = decodedData

        next()
    } catch (e) {
        return res.status(403).json({message: "User do not authorized"})
    }
};

export default checkToken;