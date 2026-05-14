// src/components/layout/Header.tsx
import {
    AppBar, Toolbar, Avatar, Typography, Box, Chip,
    IconButton, Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
    LocalHospital as LocalHospitalIcon,
    AccountCircle as AccountCircleIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import logo from '../../assets/logo.webp';
interface HeaderProps {
    currentUser: string;
    onLogout: () => void;
    onToggleSidebar: () => void;
}

export function Header({ currentUser, onLogout, onToggleSidebar }: HeaderProps) {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                background: 'linear-gradient(135deg, #0d47a1 0%, #1565C0 60%, #1976D2 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            <Toolbar sx={{ gap: 1.5 }}>
                {/* Hamburger (mobile) */}
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onToggleSidebar}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo + Title */}
                 {/*
                 <Avatar
                    sx={{
                        width: 38, height: 38,
                        bgcolor: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.25)',
                    }}
                >
                    <LocalHospitalIcon sx={{ fontSize: 20 }} />
                </Avatar> */}
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        width: 38,
                        height: 38,
                        objectFit: 'contain',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.25)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '4px',
                    }}
                />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={700} color="white" sx={{ lineHeight: 1.1 }}>
                        GERENCIA REGIONAL DE SALUD CUSCO
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)', display: { xs: 'none', sm: 'block' } }}>
                        Sistema de Información en Salud
                    </Typography>
                </Box>

                {/* User chip + logout */}
                <Chip
                    icon={<AccountCircleIcon sx={{ color: 'rgba(255,255,255,0.85) !important', fontSize: '18px !important' }} />}
                    label={currentUser}
                    size="small"
                    sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.35)',
                        fontWeight: 600,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        display: { xs: 'none', sm: 'flex' },
                    }}
                />
                <Tooltip title="Cerrar sesión">
                    <IconButton
                        onClick={onLogout}
                        size="small"
                        sx={{
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.25)',
                            bgcolor: 'rgba(255,255,255,0.08)',
                            '&:hover': { bgcolor: alpha('#d32f2f', 0.5) },
                        }}
                    >
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}