const jwt = require('jsonwebtoken')

module.exports = generateAccessToken = (payload)=>{
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    return jwt.sign(payload, accessTokenSecret, {expiresIn: accessTokenLife});
}