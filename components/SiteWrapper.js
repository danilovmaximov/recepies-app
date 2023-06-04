import React from 'react';
import Head from "next/head";
import CustomGrid from "@/components/CustomGrid";
import {Grid, GridItem, HStack, Image} from "@chakra-ui/react";
import Navigation from "@/pages/Navigation";

const SiteWrapper = ({children}) => {
    const logo = "/logo.png";
    return (
        <>
            <Head>
                <title>Recipes</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <CustomGrid>
                <GridItem as={"header"} area={"header"}>
                    <HStack alignItems="center" justify='space-between'>
                        <Image src={logo} width={150} mr={8} alt='Logo'/>
                        <Navigation/>
                    </HStack>
                </GridItem>

                <Grid>
                    {children}
                </Grid>

                <GridItem as={"footer"} area={"footer"}>
                </GridItem>
            </CustomGrid>
        </>
    );
}

export default SiteWrapper;
