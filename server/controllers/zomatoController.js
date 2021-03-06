const axios = require('axios').default;

class ZomatoController {
    static async fetch(req, res, next) {
        const { keyword } = req.body //keyword fill with food name

        let entity_id = 74 // id for Jakarta
        let entity_type = "city"
        let q = keyword; //keyword input with food
        axios({
            method: "get",
            url: "https://developers.zomato.com/api/v2.1/search",
            params: {
                entity_id,
                entity_type,
                q
            },
            headers: {
                "user-key": process.env.ZOMATO_USER_KEY
            },
        })
            .then(function (response) {
                // console.log(res);
                res.status(200).json({ result: response.data })

            })
            .catch(function (err) {
                next(err)
            })
    }
}

module.exports = ZomatoController