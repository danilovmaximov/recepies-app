import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../api/api';
import {Flex, Heading, HStack, Image, List, ListItem, OrderedList, Spacer, Text, UnorderedList} from '@chakra-ui/react';
import SiteWrapper from '@/components/SiteWrapper';

const RecipeDetailsPage = () => {
    const router = useRouter();
    const recipeId = router.query.id;
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await fetchRecipeDetails(recipeId);
                setRecipeDetails(details);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        if (recipeId) {
            fetchDetails();
        }
    }, [recipeId]);

    if (!recipeDetails) {
        return (
            <SiteWrapper>
                <Flex
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Heading size="2xl" textAlign="center">
                        Loading...
                    </Heading>
                </Flex>
            </SiteWrapper>
        );
    }


    return (
        <SiteWrapper>
            <Spacer height={75} />
            <Heading size="2xl">{recipeDetails.title}</Heading>

            <HStack justify="space-between" mt={10}>
                <Flex alignItems="center">
                    <Text fontSize="lg" fontWeight="bold">
                        Servings:
                    </Text>
                    <Text fontSize="lg" ml={2}>
                        {recipeDetails.servings}
                    </Text>
                </Flex>
                <Flex alignItems="center">
                    <Text fontSize="lg" fontWeight="bold">
                        Ready in Minutes:
                    </Text>
                    <Text fontSize="lg" ml={2}>
                        {recipeDetails.readyInMinutes}
                    </Text>
                </Flex>
                <Flex alignItems="center">
                    <Text fontSize="lg" fontWeight="bold">
                        Health Score:
                    </Text>
                    <Text fontSize="lg" ml={2}>
                        {recipeDetails.healthScore}
                    </Text>
                </Flex>
            </HStack>

            <HStack justify='space-between' alignItems='top'>
                <Flex flexDirection='column'>
                    <Heading size="xl" mt={8} mb={5}>
                        Ingredients
                    </Heading>
                    <UnorderedList pl={4} styleType="disc">
                        {recipeDetails.extendedIngredients.map((ingredient) => (
                            <ListItem key={ingredient.id}>
                                <Text fontSize='lg'>{ingredient.original}</Text>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Flex>
                <Image src={recipeDetails.image} mt={8} alt="Recipe Image" />
            </HStack>

            <Spacer height={50}/>
            {recipeDetails.analyzedInstructions.length > 0 && (
                <>
                    <Heading size="xl" mt={8} mb={5}>
                        Instructions
                    </Heading>
                    <OrderedList pl={4}>
                        {recipeDetails.analyzedInstructions[0].steps.map((step) => (
                            <ListItem key={step.number}>
                                <Text fontSize='lg'>{step.step}</Text>
                            </ListItem>
                        ))}
                    </OrderedList>
                </>
            )}
        </SiteWrapper>
    );
};

export default RecipeDetailsPage;
