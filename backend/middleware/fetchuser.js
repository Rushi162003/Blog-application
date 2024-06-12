var jwt = require("jsonwebtoken");
const JWT_SECRET = "RushiIisagood$boy";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const authToken = req.header('auth-token');
    if (!authToken) {
        res.status(401).send({error: "Please authinticate using a vild token"})
    }
    try{
        const data = jwt.verify(authToken, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({error: "Please authinticate using a vild token"});
    }
}
module.exports = fetchuser