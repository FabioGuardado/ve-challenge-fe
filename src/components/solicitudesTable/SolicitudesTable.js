"use client";

import Link from "next/link";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { getAllSolicitudes } from "@/api/solicitudes";

import useFetchData from "@/hooks/useFetchData";

import styles from "./SolicitudesTable.module.css";
import ROUTES from "@/constants/routes";

export default function SolicitudesTable() {
  const { isLoading, data } = useFetchData(getAllSolicitudes);

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className={styles.tableHeaderCell} sx={{ minWidth: '200px' }}>
                Nombre del solicitante
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>Telefono</TableCell>
              <TableCell className={styles.tableHeaderCell}>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell></TableCell>
                <TableCell component="th" scope="row">
                  {`${row.nombres} ${row.apellidos}`}
                </TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" className={styles.detallesButton}>
                    <Link href={ROUTES.detalles(row._id)}>Ver detalles</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
