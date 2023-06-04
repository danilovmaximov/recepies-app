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
                <Link href="/recipes" passHref>
                    <Button>
                        Our Recipes
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
};

export default Navigation;