import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    FormControl,
    CloseButton,
    FormLabel,
    Heading,
    Image,
    Input,
    Spacer,
    Textarea,
    Text,
    VStack,
    HStack,
    useToast,
    Select, Center, Spinner, Flex, Grid,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import SiteWrapper from '@/components/SiteWrapper';
import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const CreateRecipe = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const cuisines = [
        'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European',
        'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish',
        'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
        'Spanish', 'Thai', 'Vietnamese'
    ];

    const diets = [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan',
        'Pescetarian', 'Paleo', 'Primal', 'Low FODMAP', 'Whole30'
    ];

    const formik = useFormik({
        initialValues: {
            title: '',
            servings: '',
            readyInMinutes: '',
            healthScore: '',
            lowercaseIngredientNames: '',  // For searching by ingredient, as Firestore has no query for it
            extendedIngredients: '',
            analyzedInstructions: '',
            cuisine: '',
            diet: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            servings: Yup.number()
                .positive('Must be positive')
                .integer('Must be an integer')
                .required('Required'),
            readyInMinutes: Yup.number().positive('Must be positive').integer('Must be an integer'),
            healthScore: Yup.number()
                .min(0, 'Must be between 0 and 100')
                .max(100, 'Must be between 0 and 100')
                .integer('Must be an integer'),
            extendedIngredients: Yup.string().required('Required'),
            analyzedInstructions: Yup.string().required('Required'),
            cuisine: Yup.string(),
            diet: Yup.string(),
        }),
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                values.extendedIngredients = values.extendedIngredients.split(/[.,\n]+/).map((item, index) => ({
                    id: index + 1,
                    original: item.trim(),
                }));
                values.ingredientsNames = values.extendedIngredients.map(i => i.original);
                values.lowercaseIngredientNames = values.extendedIngredients.map(ingredient => ingredient.original.toLowerCase());

                values.analyzedInstructions = [
                    {
                        steps: values.analyzedInstructions.split(/[.]+/).map((item, index) => ({
                            number: index + 1,
                            step: item.trim(),
                        })),
                    },
                ];

                const reader = new FileReader();
                reader.onloadend = async () => {
                    const fileData = reader.result;
                    try {
                        const docRef = await addDoc(collection(db, 'recipes'), values);
                        const id = docRef.id;

                        const fileDocRef = await addDoc(collection(db, 'images'), {
                            recipeId: id,
                            file: fileData,
                        });
                        const fileDocId = fileDocRef.id;

                        const downloadURL = `data:${selectedFile.type};base64,${fileData}`;

                        await updateDoc(doc(db, 'recipes', id), {
                            imageURL: downloadURL,
                        });

                        toast({
                            title: 'Recipe saved.',
                            description: 'Your recipe has been successfully saved.',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });

                        setIsLoading(false);
                        router.push('/');
                    } catch (e) {
                        console.error('Error adding document: ', e);
                        toast({
                            title: 'An error occurred.',
                            description: 'Unable to save your recipe. Please try again.',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                };

                reader.readAsDataURL(selectedFile);
            } catch (e) {
                console.error('Error adding document: ', e);
                toast({
                    title: 'An error occurred.',
                    description: 'Unable to save your recipe. Please try again.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        },
    });

    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (isLoading) {
        return (
            <SiteWrapper>
                <Center h="100vh">
                    <Spinner size="xl"/>
                </Center>
            </SiteWrapper>
        );
    }

    return (
        <SiteWrapper>
            <Spacer height={75} />
            <Heading size="2xl" mb={10}>
                Create your recipe
            </Heading>
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl mb={5}>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
                    </FormControl>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={5}>
                        <FormControl>
                            <FormLabel>Servings</FormLabel>
                            <Input
                                name="servings"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.servings}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Time to cook (in minutes)</FormLabel>
                            <Input
                                name="readyInMinutes"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.readyInMinutes}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Health Score (0-100)</FormLabel>
                            <Input
                                name="healthScore"
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.healthScore}
                            />
                        </FormControl>
                    </Grid>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={5}>
                        <FormControl>
                            <FormLabel>Cuisine</FormLabel>
                            <Select
                                name="cuisine"
                                onChange={formik.handleChange}
                                value={formik.values.cuisine}
                                placeholder="Select cuisine"
                            >
                                {cuisines.map((cuisine) => (
                                    <option value={cuisine} key={cuisine}>
                                        {cuisine}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Diet</FormLabel>
                            <Select
                                name="diet"
                                onChange={formik.handleChange}
                                value={formik.values.diet}
                                placeholder="Select diet"
                            >
                                {diets.map((diet) => (
                                    <option value={diet} key={diet}>
                                        {diet}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <FormControl mb={5}>
                        <FormLabel>Ingredients</FormLabel>
                        <Textarea
                            name="extendedIngredients"
                            onChange={formik.handleChange}
                            value={formik.values.extendedIngredients}
                        />
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel>Instructions</FormLabel>
                        <Textarea
                            name="analyzedInstructions"
                            onChange={formik.handleChange}
                            value={formik.values.analyzedInstructions}
                        />
                    </FormControl>

                    <VStack
                        {...getRootProps()}
                        align="center"
                        justify="center"
                        height="120px"
                        borderWidth="2px"
                        borderRadius="md"
                        borderColor="gray.300"
                        borderStyle="dashed"
                        p={4}
                        mb={5}
                        cursor="pointer"
                        overflow="hidden"
                    >
                        <input {...getInputProps()} />
                        {selectedFile ? (
                            <Box position="relative" boxSize="100px">
                                <Image
                                    src={URL.createObjectURL(selectedFile)}
                                    boxSize="80px"
                                    border="2px solid"
                                    borderColor="gray.300"
                                    borderRadius="md"
                                    alt="preview"
                                />
                                <CloseButton
                                    size="sm"
                                    position="absolute"
                                    top="-2"
                                    right="-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                    }}
                                />
                            </Box>
                        ) : isDragActive ? (
                            <Text>Drop the image here ...</Text>
                        ) : (
                            <Text>Drag and drop a recipe image here, or click to select a file</Text>
                        )}
                    </VStack>

                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </SiteWrapper>
    );
};

export default CreateRecipe;