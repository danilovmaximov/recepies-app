import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import Layout from "./Layout";

const Home = () => {
    return (
        <Layout>
            <Heading as="h1" size="xl" mb={4}>
                Welcome to Recipes App
            </Heading>
            <Text fontSize="lg">
                This is the home page of your Recipes app. You can start building your app from here!
            </Text>
        </Layout>
    );
};

export default Home;