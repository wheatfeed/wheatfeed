const route = require('express').Router()
const userRoute = require('./userRoute')

route.use('/user', userRoute)
// route.use('/zomato', zomatoRoute)
// route.use('/news', newsRoute)
// route.use('/spoonacular', spoonacularRoute)

module.exports = route