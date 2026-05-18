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
import { ReportesPage } from './pages/FED/ReportesFED';
import { CG10Page } from './pages/CG/CG10Page';
import { HisDiarioPage } from './pages/FED/HisDiarioPage';
import { FedMC0301Page } from './pages/FED/FedMC0301Page';
import { FedSI0101Page } from './pages/FED/FedSI0101Page';
import { FedMC0201Page } from './pages/FED/FedMC0201Page';
import { FedSI0102Page } from './pages/FED/FedSI0102Page';
import { FedSI0201Page } from './pages/FED/FedSI0201Page';
import { FedSI0202Page } from './pages/FED/FedSI0202Page';

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
                        <Route path="/reportesFED/fed01" element={<ReportesPage />} />
                        <Route path="/reportesFED/fed02" element={<FedMC0201Page />} />
                        <Route path="/reportesFED/fed03" element={<FedMC0301Page />} />
                        <Route path="/reportesFED/fed04" element={<FedSI0101Page />} />
                        <Route path="/reportesFED/fed05" element={<FedSI0102Page />} />
                        <Route path="/reportesFED/fed06" element={<FedSI0201Page />} />
                        <Route path="/reportesFED/fed07" element={<FedSI0202Page />} />
                        <Route path="/reportesFED/fed015" element={<HisDiarioPage />} />
                        

                        <Route path="/reportesCG/cg10" element={<CG10Page />} />
                        <Route path="/reportesCG/cg11" element={<CG10Page />} />
                        <Route path="/" element={<Navigate to="/pacientes" replace />} />
                    </Route>

                    <Route path="*" element={<Navigate to={authenticated ? '/pacientes' : '/login'} replace />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
