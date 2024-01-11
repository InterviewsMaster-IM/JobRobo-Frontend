import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import DesktopSidebar from '../Sidebar/DesktopSidebar'
import MobileSidebar from '../Sidebar/MobileSidebar';
import { Outlet } from "react-router-dom";
import Support from '../Support';

const MainLayout = () => {
    const [showSupportModal, setShowSupportModal] = useState(false);

    const handleSupportModalOpen = () => {
        setShowSupportModal(true);
    };

    const handleSupportModalClose = (reason) => {
        setShowSupportModal(false);
    };

    return (
        <>
            <Box position={'relative'} display={'flex'}>
                <DesktopSidebar handleSupportModalOpen={handleSupportModalOpen} />
                <MobileSidebar handleSupportModalOpen={handleSupportModalOpen} />
                <Box position={'relative'} flex={'1 1 0%'} marginTop={{ xs: '1.5rem', sm: '0' }}>
                    <Outlet />
                </Box>
            </Box>
            <Drawer
                anchor='right'
                open={showSupportModal}
                onClose={(_, reason) => { handleSupportModalClose(reason) }}
            >
                <Support handleSupportModalClose={handleSupportModalClose} />
            </Drawer>
        </>
    )
}

export default MainLayout;
