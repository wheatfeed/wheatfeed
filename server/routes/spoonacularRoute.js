const route = require("express").Router();
const Controller = require("../controllers/spoonacularController");

route.post("/", Controller.getRecipes);

module.exports = route;