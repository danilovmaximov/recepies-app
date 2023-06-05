import React, { useState } from 'react';
import {
    Box,
    Flex,
    Button,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    VStack, Text
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Navigation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    return (
        <Box p={4}>
            <Flex mb={4} justifyContent="space-between">
                <Box display={{ base: "block", md: "none" }}>
                    <IconButton
                        ref={btnRef}
                        aria-label="Open Menu"
                        size="lg"
                        icon={<HamburgerIcon />}
                        onClick={onOpen}
                    />
                </Box>
                <Box display={{ base: "none", md: "block" }}>
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
                </Box>
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            <Link href="/" passHref>
                                <Text as="a" fontSize="lg" fontWeight="medium" color="gray.700">
                                    Home
                                </Text>
                            </Link>
                            <Link href="/create-recipe" passHref>
                                <Text as="a" fontSize="lg" fontWeight="medium" color="gray.700">
                                    Create Recipe
                                </Text>
                            </Link>
                            <Link href="/recipes" passHref>
                                <Text as="a" fontSize="lg" fontWeight="medium" color="gray.700">
                                    Our Recipes
                                </Text>
                            </Link>
                            <Link href="/community-recipes" passHref>
                                <Text as="a" fontSize="lg" fontWeight="medium" color="gray.700">
                                    Community Recipes
                                </Text>
                            </Link>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Navigation;