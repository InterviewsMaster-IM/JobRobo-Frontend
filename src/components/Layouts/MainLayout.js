import React from 'react'
import DesktopSidebar from '../Sidebar/DesktopSidebar'
import Box from '@mui/material/Box';
import MobileSidebar from '../Sidebar/MobileSidebar';

const MainLayout = ({ children }) => {
    return (
        <Box position={'relative'} display={'flex'}>
            <DesktopSidebar />
            <MobileSidebar />
            <Box position={'relative'} flex={'1 1 0%'} marginTop={{ xs: '1.5rem', sm: '0' }}>
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout;
