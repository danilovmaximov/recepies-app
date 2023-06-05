import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';

const Navigation = () => {
    return (
        <Box p={4}>
            <Flex mb={4}>
                <Link href="/" passHref>
                    <Button mr={5}>
                        Home
                    </Button>
                </Link>
                <Link href="/create-recipe" passHref>
                    <Button mr={5}>
                        Create Recipe
                    </Button>
                </Link>
                <Link href="/recipes" passHref>
                    <Button mr={5}>
                        Our Recipes
                    </Button>
                </Link>
                <Link href="/community-recipes" passHref>
                    <Button>
                        Community Recipes
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
};

export default Navigation;