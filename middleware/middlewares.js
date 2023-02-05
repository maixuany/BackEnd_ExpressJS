const jwt = require('jsonwebtoken');
const UserSch = require("../modules/user");

const middleware = {}

middleware.authentication = async(req, res, next)=>{
    if(!req.header('Authorization'))
        return res.status(401).send({error: 'Not authorized to access this resource'})
    const token = req.header('Authorization').replace('Bearer ','')
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    try{
        const user = await UserSch.findOne({username: data.username, accessToken: token})
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    }catch(error){
        res.status(401).send({error: 'Not authorized to access this resource'})
    }
}

middleware.authorizationAdmin = async(req, res, next)=>{
    console.log(req.user)
    const me = req.user;
    if(me.role === 'Admin') next()
    else res.status(403).send("Forbidden")
}

middleware.authorizationUser = async(req, res, next)=>{
    const me = req.user;
    if(me.role === 'Admin'|| me.role==='User') next()
    else res.status(403).send("Forbidden")
}

module.exports = middleware;