const axios = require('axios');

class spoonacularController {
	static async getRecipes(req, res) {
		const { query, ingredients, maxCalories, diet } = req.body
		const fillIngredients = true;
		const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&exludeIngredients=${ingredients}&maxCalories=${maxCalories}&diet=${diet}&fillIngredients=${fillIngredients}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
		try {
			const response = await axios.get(url);
			console.log(response)
		    return res.status(200).json(response.data);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err.message });
		};
	}
}

module.exports = spoonacularController;