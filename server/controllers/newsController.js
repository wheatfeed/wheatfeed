const axios = require('axios')


class NewsController {

    static getNews(req, res, next) {
        let api_key = process.env.NEWSAPIKEY
        let url = `http://newsapi.org/v2/everything?qInTitle=culinary&from=2020-08-04&sortBy=publishedAt&apiKey=${api_key}`
        axios({
            method:'get',
            url:url
        })
        .then(response => {
            const data = response.data.articles
            return res.status(200).json({ data })
        })
        .catch(err => {
            return res.status(500).json(err)
            next()
        })
    }
}

module.exports = NewsController