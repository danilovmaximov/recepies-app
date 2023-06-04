import React from 'react';
import { Box, Heading, Image, Flex } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" maxW="300px" maxH="300px" mb={4}>
            <Image src={recipe.image} alt={recipe.title} width="full" height="160px" objectFit="cover" />
            <Box p="2" height="40px" overflow="hidden">
                <Flex>
                    <Heading isTruncated as="h3" size="md" fontWeight="bold">
                        {recipe.title}
                    </Heading>
                </Flex>
            </Box>
        </Box>
    );
};

export default RecipeCard;