import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    // THIS IS INITIAL CODE TO TEST RECIPES SECTION
    // IT IS NOW SAVED IN FIREBASE SO WE SHOULD BE ABLE TO RETRIEVE FROM THERE.
    // private recipes: Recipe[] = [
    //     new Recipe(
    //       'Lobster Pasta', 
    //       'Yum yum!', 
    //       'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg',
    //       [
    //         new Ingredient('Lobster', 1),
    //         new Ingredient('Pasta', 10)
    //       ]),
    //     new Recipe(
    //       'Perfect Hamburger Recipe', 
    //       'Delicious!',
    //       'https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger-2.jpg',
    //       [
    //         new Ingredient('Buns', 8),
    //         new Ingredient('ground beef', 2),
    //         new Ingredient('cheese', 8)
    //       ])
    //   ];

  private recipes: Recipe[] = [];  //Initializing the Recipe[] since we took out the code above.

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}