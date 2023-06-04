import React, { useEffect, useState } from 'react';
import {Heading, Spacer, Grid, useToast, InputLeftElement, Input, InputGroup, Flex, Button} from '@chakra-ui/react';
import { fetchRecipes } from './api/api';
import SiteWrapper from '@/components/SiteWrapper';
import RecipeCard from '@/components/RecipeCard';
import RecipesFilter from '@/components/RecipesFilter';
import {SearchIcon} from "@chakra-ui/icons";

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const toast = useToast();

    const onFilterChange = (filterType, value) => {
        switch (filterType) {
            case 'diet':
                setDiet(value);
                break;
            case 'cuisine':
                setCuisine(value);
                break;
            case 'ingredient':
                setIngredients(value);
                break;
            default:
                break;
        }

        setPage(1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecipes(searchQuery, diet, cuisine, ingredients, 4, page);
                setRecipes(data);
                setHasNextPage(data.length === 4)
            } catch (error) {
                console.error('Error fetching recipes:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch recipes',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchData();
    }, [searchQuery, diet, cuisine, ingredients, page, toast]);

    return (
        <SiteWrapper>
            <Spacer height={75}/>
            <Heading as="h1" size="3xl" mb={8}>
                Our recipes
            </Heading>
            <InputGroup mb={4}>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input type='search' placeholder="Search Recipes" onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
            <RecipesFilter onFilterChange={onFilterChange} />
            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={4} mt={10}>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </Grid>
            <Flex justifyContent="center" mt={8}>
                <Button
                    isDisabled={page === 1}
                    onClick={handlePreviousPage}
                    mr={2}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    isDisabled={!hasNextPage}
                    ml={2}
                >
                    Next
                </Button>
            </Flex>
        </SiteWrapper>
    );
};

export default Recipes;