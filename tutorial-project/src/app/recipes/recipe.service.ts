import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'Lobster Pasta', 
          'Yum yum!', 
          'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg',
          [
            new Ingredient('Lobster', 1),
            new Ingredient('Pasta', 10)
          ]),
        new Recipe(
          'Perfect Hamburger Recipe', 
          'Delicious!',
          'https://natashaskitchen.com/wp-content/uploads/2023/06/Cheeseburger-2.jpg',
          [
            new Ingredient('Buns', 8),
            new Ingredient('ground beef', 2),
            new Ingredient('cheese', 8)
          ])
      ];

      constructor(private slService: ShoppingListService) { }

      getRecipes() {
        return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
}