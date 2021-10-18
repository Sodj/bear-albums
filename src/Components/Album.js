import React from 'react'
import {
    Heading,
    Text,
    Image,
    HStack,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ALBUM_ICON from "../Assets/album_icon.png"

export default function Album ({album, username}) {
    
    const hover = useColorModeValue("blue.50", "blue.900")

    return (
        <Link to={`/photos/${album.id}`}>
            <HStack
                alignItems="flex-start"
                p="6"
                bg="white"
                _dark={{bg: "gray.700"}}
                _hover={{ bg: hover }}
                transitionDuration=".2s"
                boxShadow="md"
                rounded="md">

                <Image mr="2" src={ALBUM_ICON} _dark={{filter: "invert(1)"}} />

                <VStack alignItems="flex-start" justifyContent="flex-start">
                    <Heading fontSize="lg" color="gray.600" _dark={{color: "gray.200"}} textAlign="left">
                        {username}
                    </Heading>
                    <Text color="gray.600" _dark={{color: "gray.200"}}>
                        {album.title}
                    </Text>
                </VStack>

            </HStack>
        </Link>
    )
}