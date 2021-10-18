import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function ModeSwitch(){

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button
            rounded="full"
            h="12"
            w="12"
            pos="absolute"
            top="4"
            onClick={toggleColorMode}
            right="4">
            {colorMode === 'light'? <MoonIcon/> : <SunIcon/>}
        </Button>
    )
}