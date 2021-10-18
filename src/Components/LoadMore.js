import React from 'react'
import {
    Box,
    Button,
    Spinner,
} from '@chakra-ui/react'

export default function LoadMore({showMore, loadingMore}) {
    return (
        <Box flexBasis="100%" textAlign="center">
            <Button
                size="xs"
                bg="white"
                color="black"
                boxShadow="2px 2px 20px 5px #00000026"
                _hover={{ opacity: .8 }}
                fontWeight="normal"
                borderRadius="99"
                mx="auto" mt="40px" w="120px"
                onClick={showMore}>
    
                {loadingMore ? <Spinner size="sm" /> : "Show more"}
            </Button>
        </Box>
    )
}