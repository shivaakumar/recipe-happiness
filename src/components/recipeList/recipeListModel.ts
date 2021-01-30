
export interface IRecipeList {
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    health: string[];
    calories: string;
    time: string;
    diet: string[];
}

export default class RecipeList {
    cuisineType = [];
    mealType= [];
    dishType= []
    health= [];
    calories= '';
    time= '';
    diet= [];

    recipelist: IRecipeList[] = [];

    getPropVal (row: any, propname: string) {
        if(!!propname && !!row['recipe'] && !!row['recipe'][propname]) {
            return row['recipe'][propname];
        }
        return '';
    }
    parseModel (jsonResponse: any) {
        if(!!jsonResponse['hits']) {
            let hits = jsonResponse['hits'];
            if (!!hits && hits.length > 0) {
                hits.forEach((hit: any) => {
                    let recipe = { } as IRecipeList;
                    recipe.calories = this.getPropVal(hit, 'calories');
                    recipe.dishType = this.getPropVal(hit, 'dishType');
                    recipe.mealType = this.getPropVal(hit, 'mealType');
                    recipe.cuisineType = this.getPropVal(hit, 'cuisineType');
                    recipe.time = this.getPropVal(hit, 'totalTime');
                    recipe.diet = this.getPropVal(hit, 'dietLabels');
                    recipe.health = this.getPropVal(hit, 'healthLabels');
                    this.recipelist.push(recipe);
                })
            }
        }
    }
}