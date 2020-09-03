const { verifyToken } = require("../helpers/jwt")

const authentication = (req, res, next) => {
    const {access_token} = req.headers

    if(!access_token) {
        // return res.status(400).json({message: 'Please login first'})
        throw {message: 'Please login first', statusCode: 400}
    }

    try {
        const userData = verifyToken(access_token)
        req.userData = userData

        next()
    } catch(err) {
        // return res.status(401).json({message: 'User not authenticated'})
        return next(err)
    }
}


module.exports = authentication