"use client";

import { useCallback } from "react";
import { useParams } from "next/navigation";

import Typography from "@mui/material/Typography";

import { getSolicitudById } from "@/api/solicitudes";
import useFetchData from "@/hooks/useFetchData";

import UserInfoCard from "../userInfoCard/UserInfoCard";

import styles from "./SolicitudDetails.module.css";
import DocumentsInfoCard from "../documentsInfoCard/DocumentsInfoCard";

export default function SolicitudDetails() {
  const { solicitudId } = useParams();

  const getRequest = useCallback(
    () => getSolicitudById(solicitudId),
    [solicitudId]
  );
  const { isLoading, data, isError } = useFetchData(getRequest);

  if (isError) return <h1>Solicitud no encontrada</h1>;

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <Typography variant="h4" sx={{ fontWeight: "600", marginBottom: "2rem" }}>
        Detalles de la solicitud
      </Typography>
      <div className={styles.solicitudDetailsContainer}>
        <UserInfoCard user={data} />
        <DocumentsInfoCard documentoUrl={data?.documentoIdentificacionUrl} />
      </div>
    </>
  );
}
