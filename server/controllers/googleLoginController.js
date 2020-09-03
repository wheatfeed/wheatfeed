const axios = require('axios').default;
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')

const client = new OAuth2Client(process.env.GOOOGLE_CLIENT_ID);
const secret = process.env.SECRET

class GoogleLogin {
    static async verifyLogin(req, res, next){
      try{
        const {google_access_token} = req.headers
        let ticket = await client.verifyIdToken({
          idToken : google_access_token,
          audience: process.env.GOOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();          //payload contain user EMAIL, NAME, dll
        let userData = await User.findOne({where:{email: payload.email}})
        if(userData){
          //generate access_token 
          const payload = {
            id: userData.id,
            email: userData.email,
            name: payload.email
          }
          let access_token = generateToken(payload)
          res.send(200).json({access_token})
        }
        else{
          //create data on databse
          let newGoogleUser = await User.create({
            email : payload.email,
            name: payload.name,
            password: "asdf1234!@#$"
          })
          //generate access token
          let access_token = generateToken(newGoogleUser)
          res.send(200).json({access_token})
        }
      }catch(err){
        res.send(500).json(err)
      }
    }

}

module.exports = GoogleLogin