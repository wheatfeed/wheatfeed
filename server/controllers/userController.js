const { User } = require('../models')
const comparePassword = require('../helpers/comparePassword')
const { generateToken } = require('../helpers/jwt')

class UserController {

    static register(req, res) {
        const { name, email, password } = req.body

        User.create({name, email, password})
        .then(user => {
            const {name, email} = user
            return res.status(201).json({name, email})
        })
        .catch(err => {
            return res.status(500).json({message: err})
        })
    }

    static login(req, res) {
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
                    return res.status(400).json({message: err})
                }

            } else {
                return res.status(400).json({meesage: err})
            }
        })
        .catch(err => {
            return res.status(500).json({message: err})
        })
    }
}


module.exports = UserController