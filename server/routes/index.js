const route = require('express').Router()
const userRoute = require('./userRoute')
const zomatoRoute = require('./zomatoRoute')

// route.use('/user', userRoute)
route.use('/zomato', zomatoRoute)
// route.use('/news', newsRoute)
// route.use('/spoonacular', spoonacularRoute)

module.exports = route