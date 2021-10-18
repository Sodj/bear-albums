import React from 'react'
import {
    Text,
    Image,
    Box,
    useColorModeValue,
    Button,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons';

export default function Photo({ photo, kittens, openPhoto }) {

    const hover = useColorModeValue("blue.50", "blue.900")

    return (
        <Box
            pos="relative"
            p="6"
            bg="white"
            _dark={{ bg: "gray.700" }}
            _hover={{ bg: hover }}
            transitionDuration=".2s"
            boxShadow="md"
            cursor="pointer"
            onClick={e => openPhoto(kittens ? photo.kitty : photo.url)}
            rounded="md">

            <Image
                src={kittens ? photo.kitty : photo.url}
                alt={photo.title}
                rounded="md" />
            <Text mt="4" color="gray.800" _dark={{ color: "gray.200" }}>
                {photo.title}
            </Text>
        </Box>
    )
}