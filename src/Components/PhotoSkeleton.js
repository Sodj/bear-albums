import React from 'react'
import {
    Box,
    Skeleton,
    SkeletonText,
} from '@chakra-ui/react'

export default function PhotoSkeleton() {
    return (
        <Box
            p="6"
            bg="white"
            _dark={{bg: "gray.700"}}
            boxShadow="md"
            rounded="md">

            <Skeleton 
                w="100%" 
                h={{sm: "80vw", md: "35vw", lg: "16vw", "2xl": "11vw"}} 
                rounded="md" />
            <SkeletonText mt="4" noOfLines={3}/>
        </Box>
    )
}