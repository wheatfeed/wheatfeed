const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOOGLE_CLIENT_ID);

class GoogleLogin {
    static async verifyLogin(req, res, next){
      try{
        const {google_access_token} = req.headers
        // console.log(google_access_token);
        let ticket = await client.verifyIdToken({
          idToken : google_access_token,
          audience: process.env.GOOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();       
        console.log(payload);   //payload contain user EMAIL, NAME, dll
        let userData = await User.findOne({where:{email: payload.email}})
        if(userData){
          //generate access_token 
          const mumet = {
            id: userData.id,
            email: userData.email,
            name: payload.email
          }
          let access_token = generateToken(mumet)
          res.status(200).json({access_token})
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
          res.status(200).json({access_token})
        }
      }catch(err){
        res.status(500).json(err)
      }
    }

}

module.exports = GoogleLogin