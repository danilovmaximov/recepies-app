import React from 'react';
import {fetchRecipeDetails} from "@/pages/api/api";

const useRecipeWithIdData = (recipeId) => {
    return fetchRecipeDetails(recipeId);
};

export default useRecipeWithIdData;