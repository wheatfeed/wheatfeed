const { get } = require('.')
const ZomatoController = require('../controllers/zomatoController')

const route = require('express').Router()

route.post("/", ZomatoController.fetch)
// route.use('/spoonacular', spoonacularRoute)

module.exports = route