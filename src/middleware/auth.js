const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';
const {users} = require("../controllers/user")


const isAuthenticated = async(req,res,next)=>{
    try{
       
        const access_token = req.cookies.access_token;

        if(!access_token){
            return res.status(400).json({message: "Please login to access to this resourse"})
        }

        const decoded = jwt.verify(access_token, secret)
        
        if(!decoded){
            return res.status(400).json({message: "Invalid token"})
        }

        const user =  users.find(user => user.id === decoded.id);
        
        if(!user){
            return res.status(400).json({message: "Please login"})
        }

        req.user = user
        next()
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports.isAuthenticated = isAuthenticated