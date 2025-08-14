const jwt = require('jsonwebtoken');
const JWT_SECRET = "AgJtUIy@#@!$%&*()_+1234567890";

const fetchUser =  (req, res, next) => {
    try{
        const token = req.header('authToken');
        if(!token) {
            res.status(401).send({ error: "Please authenticate using a valid token" });
        }
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = fetchUser;