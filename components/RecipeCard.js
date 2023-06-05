import React from 'react';
import {Box, Heading, Image, Flex, Button} from '@chakra-ui/react';
import Link from "next/link";

const RecipeCard = ({ recipe }) => {

    return (
        <Box
            as="a"
            href={`/recipes/${recipe.id}`}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            maxW="300px"
            maxH="300px"
            mb={4}
            _hover={{ boxShadow: 'lg', textDecoration: 'none' }}
        >
            <Link href={`/recipes/${recipe.id}`} passHref>
                <Image src={recipe.image} alt={recipe.title} width="full" height="160px" objectFit="cover" />
            </Link>
            <Box p="2" height="40px" overflow="hidden">
                <Flex>
                    <Link href={`/recipes/${recipe.id}`} passHref>
                        <Heading isTruncated size="md" cursor="pointer">
                            {recipe.title}
                        </Heading>
                    </Link>
                </Flex>
            </Box>
        </Box>
    );
};

export default RecipeCard;