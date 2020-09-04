const route = require('express').Router()
const userRoute = require('./userRoute')
const zomatoRoute = require('./zomatoRoute')
const newsRoute = require('./newsRoute')
const spoonacularRoute = require('./spoonacularRoute')
const authentication = require ("../middlewares/auth")

route.use('/user', userRoute)

route.use(authentication)

route.use('/zomato', zomatoRoute)
route.use('/news', newsRoute)
route.use('/spoonacular', spoonacularRoute)

module.exports = route