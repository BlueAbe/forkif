import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { delayForCall } from './helpers.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable'; // polyfilling for all
import 'regenerator-runtime/runtime'; //polyfilling for async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    // 0) Render spiner
    recipeView.renderSpinere();
    // 1) Load data
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // 2) Render recipe
    recipeView.render(recipe);
    // 3) Update results view and bookmarks to mark selected element
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    recipeView.renderError(err.message);
  }
};
const controlSearchResults = async function () {
  try {
    // 0) Get search query
    const query = searchView.getQuerry();
    if (!query) return;
    // 1) Render spiner
    resultsView.renderSpinere();
    // 2) Load Results
    await model.loadSearchResults(query);
    const { results } = model.state.search;
    // 3) Render results
    resultsView.render(model.getSearchResultPage(model.state.search.page));
    // 4) Render pagination buttons
    paginationView.render(model.state.search); //??
  } catch (err) {
    //console.error(err);
    resultsView.renderError(err.message);
  }
};
const controlerPagination = function (goToPage) {
  // 1) render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));
  // 2) render NEW button
  paginationView.render(model.state.search);
};
const controlServings = function (changeServings) {
  //Update servings in state
  model.updateServings(changeServings);
  //Update recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.removeBookmarks(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    //Upload new Recipe
    await model.uploadRecipe(newRecipe);
    //Render new Recipe
    recipeView.render(model.state.recipe);
    //Render bookmarks view
    bookmarksView.render(model.state.bookmarks);
    //Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Close form window with message
    addRecipeView.renderMessage('Recipe added successfully');
    setTimeout(function () {
      addRecipeView.hideWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes); // solution for move handlers to recipe view
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); // solution for move handlers to search view
  paginationView.addHandlerClick(controlerPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
