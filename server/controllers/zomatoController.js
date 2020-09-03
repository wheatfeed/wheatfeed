const axios = require('axios').default;

class ZomatoController{
  static async fetch(req, res){
    const {keyword} = req.body //keyword fill with food name
    console.log(keyword);   

    let entity_id = 74 // id for Jakarta
    let entity_type = "city" 
    let q = keyword; //keyword input with food
    axios({
      method: "get",
      url: "https://developers.zomato.com/api/v2.1/search",
      params:{
        entity_id,
        entity_type,
        q
      },
      headers:{
        "user-key": "46f0cd855e968dcd1cdb21eccc9980e9"
      },
    })
      .then(function(response){
        // console.log(res);
        console.log(response.data);
        res.status(200).json({result: response.data})

      })
      .catch(function(err){
        console.log(err);
        res.status(500).json(err)
      })
  }
}

module.exports = ZomatoController