import React from 'react';
import { IRecipeList } from './recipeListModel'
import './recipeList.css';

export interface IRecipeprops {
    recipes: IRecipeList[]
}

const RecipeListComp = (props: IRecipeprops) => {
    if (!props.recipes) {
        return null;
    }
    return (
        <div>
            <table className='recipe'>
                <thead>
                    <tr>
                        <th>Cuisine Type</th>
                        <th>Meal Type</th>
                        <th>Dish Type</th>
                        <th>Health</th>
                        <th>Caloies</th>
                        <th>Time</th>
                        <th>Diet</th>
                    </tr>
                </thead>
                <tbody>
                      {!!props && 
                        props.recipes.map((row: IRecipeList, index) => {
                            return <tr key={index}>
                               <td>
                                    {!!row.cuisineType && row.cuisineType.length > 0 &&
                                        row.cuisineType.map((cuisine, index) => <span key={`${index}-${cuisine}`} className='small-margin'>{cuisine}</span>)
                                    }
                               </td>
                               <td>
                                    {!!row.dishType && row.dishType.length > 0 &&
                                        row.dishType.map((dish, index) => <span key={`${index}-${dish}`} className='small-margin'>{dish}</span>)
                                    }
                               </td>
                               <td>
                                    {!!row.mealType && row.mealType.length > 0 &&
                                        row.mealType.map((meal, index) => <span key={`${index}-${meal}`} className='small-margin'>{meal}</span>)
                                    }
                               </td>
                               <td>
                                    {!!row.health && row.health.length > 0 &&
                                        row.health.map((health, index) => <span key={`${index}-${health}`} className='small-margin'>{health} </span>)
                                    }
                               </td>
                               <td>
                                    {!!row.diet && row.diet.length > 0 &&
                                        row.diet.map((diet, index) => <span key={`${index}-${diet}`} className='small-margin'>{diet}</span>)
                                    }
                               </td>
                               <td>{row.time}</td>
                               <td>{row.calories}</td>
                            </tr>
                        })
                      }  
                </tbody>
            </table>
        </div>
    )
}
export default RecipeListComp;