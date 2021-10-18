import React from 'react'
import {
    SkeletonText,
    HStack,
    VStack,
    Skeleton,
} from '@chakra-ui/react'

export default function AlbumSkeleton() {
    return (
        <HStack
            alignItems="flex-start"
            p="6"
            bg="white"
            _dark={{ bg: "gray.700" }}
            boxShadow="md"
            rounded="md">

            <Skeleton h="54px" w="64px" mr="2" rounded="md" />

            <VStack
                w="100%"
                h="64px"
                alignItems="flex-start"
                justifyContent="flex-start">

                <SkeletonText noOfLines={1} w="40%" mb="5" />
                <SkeletonText noOfLines={2} w="100%" />
            </VStack>
        </HStack>
    )
}