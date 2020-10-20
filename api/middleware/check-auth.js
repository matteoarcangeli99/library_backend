
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    const token = req.headers.authorization.split(" ");
    console.log(token);
    const decoded = jwt.verify(token, "top_secret");
    next();
        
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
   
};