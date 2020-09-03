const route = require('express').Router()
const NewsController = require('../controllers/newsController')


route.get('/', NewsController.getNews)

module.exports = route