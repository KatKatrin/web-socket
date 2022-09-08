import jwt from "jsonwebtoken";
import privateKey from "../privateKey.js";


function checkToken (req, res, next) {

    if (req.method === "OPTIONS") {
      next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({message: "User do not authorized 1"})
        }

        const decodedData = new Promise((resolve, reject) => {
            jwt.verify(token, privateKey, { algorithms: ['RS256'] }, function(err, decoded){
                if (err){
                   return reject(err)
                }
                  resolve(decoded)
            })
        })

         decodedData.then(decoded => { req.userDecodedData = decoded })
                    .then(next())


    } catch (e) {
        return res.status(403).json({ message: e })
    }
};

export default checkToken;