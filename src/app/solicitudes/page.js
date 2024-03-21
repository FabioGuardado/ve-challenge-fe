import Typography from '@mui/material/Typography';

import SolicitudesTable from '@/components/solicitudesTable/SolicitudesTable';

export default function ListaDeUsuarios() {
  return (
    <>
    <div className="wrapper">
      <Typography variant='h4' sx={{ fontWeight: '600', marginBottom: '2rem' }}>Listado de solicitudes</Typography>
      <SolicitudesTable />
    </div>
    </>
  );
}
