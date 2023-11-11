const {getUserByEmail, addUsers, getAllUsers} = require("./auth/auth")
const {
  getAllRecipes,
  getName,
  getCategory,
  getRecipeByID,
  getFilteredName,
} = require("./users/users");
const { addRecipes } = require("./admin/admin")

module.exports = {
  getUserByEmail,
  addUsers,
  getAllUsers,
  getAllRecipes,
  getName,
  getCategory,
  getRecipeByID,
  addRecipes,
  getFilteredName,
};