import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../api/api';
import {
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    Image,
    ListItem,
    OrderedList,
    Spacer, Spinner,
    Text,
    UnorderedList
} from '@chakra-ui/react';
import SiteWrapper from '@/components/SiteWrapper';
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/lib/firebase";

const RecipeDetailsPage = () => {
    const router = useRouter();
    const { id: recipeId, communityRecipe } = router.query;
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                let details;

                if (communityRecipe) {
                    const recipeDocRef = doc(db, 'recipes', recipeId);
                    const recipeDocSnap = await getDoc(recipeDocRef);
                    if (recipeDocSnap.exists()) {
                        details = recipeDocSnap.data();

                        const imageCollectionRef = collection(db, 'images');
                        const imageQuery = query(imageCollectionRef, where('recipeId', '==', recipeId));
                        const imageQuerySnapshot = await getDocs(imageQuery);

                        if (!imageQuerySnapshot.empty) {
                            const imageDocSnap = imageQuerySnapshot.docs[0];
                            const imageData = imageDocSnap.data();
                            details.image = imageData.file;
                        }
                    }
                } else {
                    details = await fetchRecipeDetails(recipeId);
                }

                setRecipeDetails(details);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        if (recipeId) {
            fetchDetails();
        }
    }, [recipeId, communityRecipe]);

    if (!recipeDetails) {
        return (
            <SiteWrapper>
                <Center h="100vh">
                    <Spinner size="xl"/>
                </Center>
            </SiteWrapper>
        );
    }

    console.log(recipeDetails);

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

            <Flex flexDirection='column'>
                <Image src={recipeDetails.image} mt={8} alt="Recipe Image" objectFit='cover' />
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
            </Flex>

        </SiteWrapper>
    );
};

export default RecipeDetailsPage;
