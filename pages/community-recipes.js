import React, { useEffect, useState } from 'react';
import {
    Heading,
    Spacer,
    Grid,
    useToast,
    InputLeftElement,
    Input,
    InputGroup,
    Flex,
    Button, Center, Spinner
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
    collection,
    query,
    where,
    getDocs,
    limit,
    orderBy,
    startAfter,
    doc,
    getDoc,
} from 'firebase/firestore';
import SiteWrapper from '@/components/SiteWrapper';
import RecipeCard from '@/components/RecipeCard';
import RecipesFilter from '@/components/RecipesFilter';
import { db } from '@/lib/firebase';

const CommunityRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
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
                setIsLoading(true);
                const recipesCollectionRef = collection(db, 'recipes');
                let q = query(recipesCollectionRef);

                if (searchQuery) {
                    q = query(recipesCollectionRef, where('title', '>=', searchQuery));
                }
                if (diet) {
                    q = query(recipesCollectionRef, where('diet', '==', diet));
                }
                if (cuisine) {
                    q = query(recipesCollectionRef, where('cuisine', '==', cuisine));
                }
                if (ingredients) {
                    q = query(recipesCollectionRef, where('lowercaseIngredientNames', 'array-contains', ingredients.toLowerCase()));
                }


                q = query(q, limit(4), orderBy('title'), startAfter((page - 1) * 4));

                const querySnapshot = await getDocs(q);
                const data = [];

                for (const docSnap of querySnapshot.docs) {
                    const recipeData = docSnap.data();
                    const recipeId = docSnap.id;

                    const imageCollectionRef = collection(db, 'images');
                    const imageQuery = query(imageCollectionRef, where('recipeId', '==', recipeId));
                    const imageQuerySnapshot = await getDocs(imageQuery);

                    if (!imageQuerySnapshot.empty) {
                        const imageDocSnap = imageQuerySnapshot.docs[0];
                        const imageData = imageDocSnap.data();
                        recipeData.image = imageData.file;
                    }

                    data.push({ id: recipeId, ...recipeData });
                }

                setRecipes(data);
                setIsLoading(false);
                setHasNextPage(data.length === 4);
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

    if (isLoading) {
        return (
            <SiteWrapper>
                <Center h="100vh">
                    <Spinner size="xl"/>
                </Center>
            </SiteWrapper>
        );
    }

    return (
        <SiteWrapper>
            <Spacer height={75} />
            <Heading as="h1" size="3xl" mb={8}>
                Community Recipes
            </Heading>
            <InputGroup mb={4}>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    type="search"
                    placeholder="Search Recipes"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </InputGroup>
            <RecipesFilter onFilterChange={onFilterChange} />
            <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
                gap={4}
                mt={10}
            >
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} isCommunityRecipe={true} />
                ))}
            </Grid>
            <Flex justifyContent="center" mt={8}>
                <Button isDisabled={page === 1} onClick={handlePreviousPage} mr={2}>
                    Previous
                </Button>
                <Button onClick={handleNextPage} isDisabled={!hasNextPage} ml={2}>
                    Next
                </Button>
            </Flex>
        </SiteWrapper>
    );
};

export default CommunityRecipes;