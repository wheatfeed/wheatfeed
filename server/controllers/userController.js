const { User } = require('../models')
const comparePassword = require('../helpers/comparePassword')
const { generateToken } = require('../helpers/jwt')

class UserController {

    static register(req, res, next) {
        const { name, email, password } = req.body

        User.create({name, email, password})
        .then(user => {
            const {name, email} = user
            return res.status(201).json({name, email})
        })
        .catch(err => {
            return next(err)
        })
    }

    static login(req, res, next) {
        let option = {
            where: {email: req.body.email}
        }

        User.findOne(option)
        .then(user => {
            if(user) {
                let isValid = comparePassword(req.body.password, user.password)
                if(isValid) {
                    const access_token = generateToken(user)
                    return res.status(200).json({access_token})
                } else {
                    // return res.status(400).json({message: 'Invalid email or password'})
                    throw {message: 'Invalid email or password', statusCode: 400}

                }

            } else {
                // return res.status(400).json({message: 'Invalid email or password'})
                throw {message: 'Invalid email or password', statusCode: 400}

            }
        })
        .catch(err => {
            return next(err)
        })
    }
}


module.exports = UserController