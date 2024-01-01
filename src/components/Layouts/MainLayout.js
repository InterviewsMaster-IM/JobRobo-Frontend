import React from 'react'
import DesktopSidebar from '../Sidebar/DesktopSidebar'
import Box from '@mui/material/Box';

const MainLayout = ({ children }) => {
    return (
        <Box minHeight={'100vh'}>
            <DesktopSidebar />
            <Box>
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout;
