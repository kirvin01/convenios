import { useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { PatientsPage } from './pages/PatientsPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { getCurrentUser, isAdmin, isAuthenticated, logout } from './services/authService';
import { theme } from './theme';
import './App.css';

function RequireAuth({ authenticated, children }: { authenticated: boolean; children: ReactNode }) {
    return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    useEffect(() => {
        const auth = isAuthenticated();
        setAuthenticated(auth);
        if (auth) {
            setCurrentUser(getCurrentUser());
            setUserIsAdmin(isAdmin());
        }
    }, []);

    const handleLoginSuccess = (username: string) => {
        setAuthenticated(true);
        setCurrentUser(username);
        setUserIsAdmin(isAdmin());
    };

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        setCurrentUser('');
        setUserIsAdmin(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            authenticated ? (
                                <Navigate to="/pacientes" replace />
                            ) : (
                                <LoginPage onLoginSuccess={handleLoginSuccess} />
                            )
                        }
                    />

                    <Route
                        element={
                            <RequireAuth authenticated={authenticated}>
                                <AppLayout
                                    currentUser={currentUser}
                                    userIsAdmin={userIsAdmin}
                                    onLogout={handleLogout}
                                />
                            </RequireAuth>
                        }
                    >
                        <Route path="/pacientes" element={<PatientsPage />} />
                        <Route path="/admin/usuarios" element={userIsAdmin ? <AdminUsersPage /> : <Navigate to="/pacientes" replace />} />
                        <Route path="/" element={<Navigate to="/pacientes" replace />} />
                    </Route>

                    <Route path="*" element={<Navigate to={authenticated ? '/pacientes' : '/login'} replace />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
