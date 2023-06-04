import React, {useEffect, useState} from 'react';
import { Heading, Text, Stack, Box, Image } from '@chakra-ui/react';
import Layout from "./Layout";
import { fetchRecipes } from './api/api';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRecipes('pasta', 25, 2);
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <Heading as="h1" size="xl" mb={4}>
                Recipes Page
            </Heading>
            <Stack spacing={4} align="center">
                {recipes.map((recipe) => (
                    <Box key={recipe.id} borderWidth="1px" borderRadius="md" overflow="hidden" boxShadow="md">
                        <Image src={recipe.image} alt={recipe.title} width={312} height={231} />
                        <Box p={4}>
                            <Heading as="h2" size="md" mb={2}>
                                {recipe.title}
                            </Heading>
                            <Text>{recipe.summary}</Text>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Layout>

    );
};

export default Recipes;