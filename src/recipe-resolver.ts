import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from "type-graphql";

import { User } from "./user";

import { RecipeType } from "./recipe-type";
import { RecipeService } from "./recipe-service";

@Resolver(RecipeType)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {
    this.recipeService = new RecipeService();
  }

  @Query(returns => RecipeType)
  async recipe(@Arg("id") id: string) {
    const recipe = await this.recipeService.findById(id);
    if (recipe === undefined) {
      throw new Error(`Recipe with id ${id} not found`);
    }
    return recipe;
  }

  @Query(returns => [RecipeType])
  async recipes() {
    const data = await this.recipeService.findAll({ skip: 0, take: 0 });
    console.log(data);
    
    return data
  }

  /* @Mutation(returns => RecipeType)
  @Authorized()
  addRecipe(
    @Arg("newRecipeData") newRecipeData: any,
    @Ctx("user") user: User,
  ): Promise<RecipeType> {
    return this.recipeService.addNew({ data: newRecipeData, user });
  } */

  @Mutation(returns => Boolean)
  // @Authorized(/* Roles.Admin */)
  async removeRecipe(@Arg("id") id: string) {
    try {
      await this.recipeService.removeById(id);
      return true;
    } catch (e){
      return false;
    }
  }
}