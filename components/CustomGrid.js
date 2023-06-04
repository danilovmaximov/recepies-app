import React from 'react';
import {Center, Grid} from "@chakra-ui/react";

const CustomGrid = ({children}) => {
    return (
        <Center pt={5}>
            <Grid
                templateAreas={`
                "header header"
                "main main"
                 "footer footer"
            `}
                gridTemplateRows={"1fr 3fr 1rf"}
                gridTemplateColumns={"1fr"}
                gap="1"
                w="70%"
            >
                {...children}
            </Grid>
        </Center>
    );
};

export default CustomGrid;