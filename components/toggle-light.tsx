import { NextPage } from 'next';
import { Button, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ToggleLights: NextPage = (props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            colorScheme={colorMode === 'light' ? 'gray' : 'orange'}
            variant={'ghost'}
            size={'sm'}
            isRound
            onClick={toggleColorMode}
            aria-label="Search database"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
    );
};

export default ToggleLights;
