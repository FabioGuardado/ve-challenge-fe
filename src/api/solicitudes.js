import ENDPOINTS from "@/constants/endpoints";
import baseClient from "./baseClient";

export const getAllSolicitudes = async () => {
  const { data } = await baseClient.get(ENDPOINTS.solicitudes);
  return data;
};

export const getSolicitudById = async (solicitudId = '') => {
  const endpoint = `${ENDPOINTS.solicitudes}/${solicitudId}`;
  const { data } = await baseClient.get(endpoint);
  return data;
};

export const createSolicitud = async (solicitudData) => {
  const response = await baseClient.post(ENDPOINTS.solicitudes, solicitudData);
  return response;
}