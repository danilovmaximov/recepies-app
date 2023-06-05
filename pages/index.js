import React from 'react';
import {Button, Heading, Spacer, Text} from '@chakra-ui/react';
import SiteWrapper from "@/components/SiteWrapper";
import Link from "next/link";

const Home = () => {
    return (
        <SiteWrapper ml={10}>
            <Spacer height={75}/>
            <video autoPlay loop muted src="/intro-video.mp4" style={{ width: '100%' }} />
            <Spacer height={75}/>
            <Heading as="h1" size="3xl" mb={4} ml={10}>
                Welcome!
            </Heading>
            <Text fontSize="xl" mt={8} ml={10}>
                Discover and explore a variety of delicious recipes from around the world.
                Search for your favorite cuisines, ingredients, or dietary restrictions.
                Get inspired and create your own collection of mouthwatering recipes.
            </Text>
            <Text fontSize="xl" mt={8} ml={10}>
                Dive into a world of culinary delights and unlock a treasure trove of flavorful recipes.
                Whether you are a seasoned chef or a beginner in the kitchen, our app is your gateway
                to discovering exciting dishes and expanding your cooking repertoire.
                Browse through an extensive collection of recipes sourced from diverse cultures,
                and unleash your creativity with our step-by-step instructions and helpful cooking tips.
            </Text>
            <Text fontSize="xl" mt={8} ml={10}>
                Hungry for inspiration? Our app offers a wide range of search options to cater to your
                specific preferences. Explore recipes by cuisine, dietary restrictions, or even
                by specific ingredients. With our search functionality, finding the perfect
                recipe to satisfy your cravings is just a few clicks away.
                Join our community of food enthusiasts and share your own culinary creations,
                or save your favorite recipes for later to create your personalized cookbook.
                Start your culinary journey today and embark on a flavorsome adventure with Food App!
            </Text>
            <Link href="/recipes" passHref>
                <Button mt={8} ml={10}>
                    Discover our recipes
                </Button>
            </Link>
        </SiteWrapper>
    );
};

export default Home;