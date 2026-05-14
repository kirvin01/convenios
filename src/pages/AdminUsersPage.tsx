import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { DataGrid, type GridColDef, type GridPaginationModel } from '@mui/x-data-grid';

const adminUsers = [
    { id: 1, username: 'admin', role: 'Administrador', email: 'admin@geresa.local' },
    { id: 2, username: 'supervisor', role: 'Supervisor', email: 'supervisor@geresa.local' },
];

const columns: GridColDef[] = [
    { field: 'username', headerName: 'Usuario', flex: 1, minWidth: 150 },
    { field: 'role', headerName: 'Rol', flex: 1, minWidth: 130 },
    { field: 'email', headerName: 'Correo', flex: 1.5, minWidth: 220 },
];

export function AdminUsersPage() {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });

    return (
        <Box sx={{ mt: 3, mb: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Administración de Usuarios
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
                Administra los permisos y usuarios del sistema desde esta vista.
            </Typography>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(21,101,192,0.12)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        Usuarios del sistema
                    </Typography>
                    <Button variant="contained" size="small">
                        Nuevo usuario
                    </Button>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <DataGrid
                        rows={adminUsers}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        autoHeight
                    />
                </Box>
            </Paper>
        </Box>
    );
}
