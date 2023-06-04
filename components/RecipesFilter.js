import React from 'react';
import { Stack, Select, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const RecipesFilter = ({onFilterChange}) => {

    const cuisines = [
        'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European',
        'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish',
        'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
        'Spanish', 'Thai', 'Vietnamese'
    ];

    const diets = [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
        'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
    ];

    return (
        <Stack direction={{base: 'column', md: 'row'}} spacing={4}>
            <Select placeholder="Select Cuisine" onChange={(e) => onFilterChange('cuisine', e.target.value)}>
                {cuisines.map((cuisine, i) => (
                    <option value={cuisine} key={i}>{cuisine}</option>
                ))}
            </Select>

            <Select placeholder="Select Diet" onChange={(e) => onFilterChange('diet', e.target.value)}>
                {diets.map((diet, i) => (
                    <option value={diet} key={i}>{diet}</option>
                ))}
            </Select>

            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type='search' placeholder="Search Ingredients" onChange={(e) => onFilterChange('ingredient', e.target.value)} />
            </InputGroup>
        </Stack>
    );
};

export default RecipesFilter;