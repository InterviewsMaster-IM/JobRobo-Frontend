import React from 'react'
import DesktopSidebar from '../Sidebar/DesktopSidebar'
import Box from '@mui/material/Box';

const MainLayout = ({ children }) => {
    return (
        <Box position={'relative'} display={'flex'}>
            <DesktopSidebar />
            <Box position={'relative'} flex={'1 1 0%'} >
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout;
