import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Box, Button, FormControl, FormLabel, Heading, Input, Spacer, Textarea} from '@chakra-ui/react';
import SiteWrapper from "@/components/SiteWrapper";

const CreateRecipe = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            servings: '',
            readyInMinutes: '',
            healthScore: '',
            ingredients: '',
            instructions: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            servings: Yup.number().required('Required'),
            readyInMinutes: Yup.number(),
            healthScore: Yup.number(),
            ingredients: Yup.string().required('Required'),
            instructions: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <SiteWrapper>
            <Spacer height={75} />
            <Heading size="2xl" mb={10}>Create your recipe</Heading>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl mb={5}>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Servings</FormLabel>
                        <Input name="servings" type="number" onChange={formik.handleChange} value={formik.values.servings} />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Time to cook (in minutes)</FormLabel>
                        <Input name="readyInMinutes" type="number" onChange={formik.handleChange} value={formik.values.readyInMinutes} />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Health Score</FormLabel>
                        <Input name="healthScore" type="number" onChange={formik.handleChange} value={formik.values.healthScore} />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Ingredients</FormLabel>
                        <Textarea name="ingredients" onChange={formik.handleChange} value={formik.values.ingredients} />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Instructions</FormLabel>
                        <Textarea name="instructions" onChange={formik.handleChange} value={formik.values.instructions} />
                    </FormControl>
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </SiteWrapper>
    );
};

export default CreateRecipe;