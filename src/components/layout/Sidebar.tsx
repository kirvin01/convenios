// src/components/layout/Sidebar.tsx
import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Toolbar, Typography, Box, Divider, Chip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Search as SearchIcon,
    AdminPanelSettings as AdminPanelSettingsIcon,
    LocalHospital as LocalHospitalIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    adminOnly?: boolean;
    badge?: string;
}

const navItems: NavItem[] = [
    {
        label: 'Admin Usuarios',
        path: '/admin/usuarios',
        icon: <AdminPanelSettingsIcon />,
        adminOnly: true,
        badge: 'Admin',
    },
    {
        label: 'Reportes FED',          
        path: '/reportesFED',
        icon: <AdminPanelSettingsIcon />,
        // mientras solo se meustra para admin
        adminOnly: true,
        badge: 'Admin',      
    },
    {
        label: 'Reportes CG',          
        path: '/reportesCG',
        icon: <AdminPanelSettingsIcon />,
        // mientras solo se meustra para admin
        adminOnly: true,
        badge: 'Admin',      
    },
    {
        label: 'Consulta Pacientes',
        path: '/pacientes',
        icon: <SearchIcon />,
    },
    
];

interface SidebarProps {
    isAdmin: boolean;
    mobileOpen: boolean;
    onClose: () => void;
}

function SidebarContent({ isAdmin }: { isAdmin: boolean }) {
    const navigate = useNavigate();
    const location = useLocation();

    const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Brand area below toolbar */}
            <Toolbar />
            <Box sx={{ px: 2, py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalHospitalIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                    <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                        Menú Principal
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mx: 2 }} />

            <List sx={{ px: 1, pt: 1, flex: 1 }}>
                {visibleItems.map((item) => {
                    const active = location.pathname.startsWith(item.path);
                    return (
                        <ListItemButton
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                bgcolor: active ? alpha('#1565C0', 0.1) : 'transparent',
                                color: active ? 'primary.dark' : 'text.primary',
                                '&:hover': {
                                    bgcolor: active ? alpha('#1565C0', 0.14) : alpha('#1565C0', 0.05),
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 38,
                                    color: active ? 'primary.main' : 'text.secondary',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: '0.875rem',
                                    fontWeight: active ? 700 : 500,
                                }}
                            />
                            {item.badge && (
                                <Chip
                                    label={item.badge}
                                    size="small"
                                    color="secondary"
                                    sx={{ height: 18, fontSize: '0.65rem' }}
                                />
                            )}
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ mx: 2 }} />
            <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="caption" color="text.disabled">
                    v1.0.0
                </Typography>
            </Box>
        </Box>
    );
}

export function Sidebar({ isAdmin, mobileOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
                }}
            >
                <SidebarContent isAdmin={isAdmin} />
            </Drawer>

            {/* Desktop persistent drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        borderRight: '1px solid #e8ecf0',
                        bgcolor: '#fafbfc',
                    },
                }}
            >
                <SidebarContent isAdmin={isAdmin} />
            </Drawer>
        </>
    );
}

export { DRAWER_WIDTH };