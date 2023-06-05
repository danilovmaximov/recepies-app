import React from 'react';
import { Box, Heading, Image, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const RecipeCard = ({ recipe, isCommunityRecipe }) => {
    return (
        <Box
            as="a"
            href={`/recipes/${recipe.id}${isCommunityRecipe ? '?communityRecipe=true' : ''}`}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            maxW="300px"
            maxH="300px"
            mb={4}
            _hover={{ boxShadow: 'lg', textDecoration: 'none' }}
        >
            <Link href={`/recipes/${recipe.id}${isCommunityRecipe ? '?communityRecipe=true' : ''}`} passHref>
                <Image src={recipe.image} alt={recipe.title} width="full" height="160px" objectFit="cover" />
                <Box p="2" height="40px" overflow="hidden">
                    <Flex>
                        <Heading isTruncated size="md" cursor="pointer">
                            {recipe.title}
                        </Heading>
                    </Flex>
                </Box>
            </Link>
        </Box>
    );
};

export default RecipeCard;
