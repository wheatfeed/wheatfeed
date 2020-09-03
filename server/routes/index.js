const route = require('express').Router()
const userRoute = require('./userRoute')
const newsRoute = require('./newsRoute')

// route.use('/user', userRoute)
// route.use('/zomato', zomatoRoute)
route.use('/news', newsRoute)
// route.use('/spoonacular', spoonacularRoute)

module.exports = route