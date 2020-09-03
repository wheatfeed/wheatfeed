const jwt = require('jsonwebtoken')
const secret = process.env.SECRET


const generateToken = (user) => {
    const access_token = jwt.sign({email: user.email, name: user.name, id: user.id}, secret)

    return access_token
}


const verifyToken = (payload) => {
    const verified = jwt.verify(payload, secret)
    return verified
}


module.exports = {generateToken, verifyToken}