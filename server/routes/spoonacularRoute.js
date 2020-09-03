const route = require("express").Router();
const Controller = require("../controllers/spoonacularController");

route.get("/", Controller.getRecipes);

module.exports = route;