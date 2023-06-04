import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <Box p={4}>
            <Flex mb={4}>
                <Link href="/" passHref>
                    <Text mr={4}>Home</Text>
                </Link>
                <Link href="/recipes" passHref>
                    <Text>Recipes</Text>
                </Link>
            </Flex>
            {children}
        </Box>
    );
};

export default Layout;