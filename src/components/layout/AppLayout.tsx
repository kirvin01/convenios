// src/components/layout/AppLayout.tsx
import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar, DRAWER_WIDTH } from './Sidebar';
import { Footer } from './Footer';

interface AppLayoutProps {
    currentUser: string;
    userIsAdmin: boolean;
    onLogout: () => void;
}

export function AppLayout({ currentUser, userIsAdmin, onLogout }: AppLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Header
                currentUser={currentUser}
                onLogout={onLogout}
                onToggleSidebar={() => setMobileOpen((prev) => !prev)}
            />

            <Sidebar
                isAdmin={userIsAdmin}
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            {/* Main content area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    ml: { md: `${DRAWER_WIDTH}px` },
                    minWidth: 0,
                    bgcolor: 'background.default',
                }}
            >
                {/* Spacer for fixed AppBar */}
                <Toolbar />

                {/* Page content injected by React Router */}
                <Box sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </Box>
    );
}