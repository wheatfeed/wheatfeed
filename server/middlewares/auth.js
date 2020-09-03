const { verifyToken } = require("../helpers/jwt")

const authentication = (req, res, next) => {
    const {access_token} = req.headers

    if(!access_token) {
        return res.status(400).json({message: err})
    }

    try {
        const userData = verifyToken(access_token)
        req.userData = userData

        next()
    } catch(err) {
        return res.status(401).json({message: err})
    }
}


// const authorization = (req, res, next) => {
//     const {id} = req.params

// }

module.exports = authentication