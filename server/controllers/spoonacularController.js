const axios = require('axios');

class spoonacularController {
	static async getRecipes(req, res) {
		const query = "";
		const ingredients = "spinach";
		const maxCalories = 800;
		const diet = "";
		const fillIngredients = true;
		const totalSearch = 3;
		const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&includeIngredients=${ingredients}&maxCalories=${maxCalories}&diet=${diet}&fillIngredients=${fillIngredients}&number=${totalSearch}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
		try {
			const response = await axios.get(url);console.log(response.data);
		    return res.status(200).json(response.data);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ message: err.message });
		};
	}
}

module.exports = spoonacularController;