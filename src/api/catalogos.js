import ENDPOINTS from "@/constants/endpoints";
import baseClient from "./baseClient";

export const getAllDepartamentos = async () => {
  const { data } = await baseClient.get(ENDPOINTS.departamentos);
  return data;
};

export const getMunicipiosByDepartamentoId = async (departamentoId) => {
  if (departamentoId) {
    const endpoint = `${ENDPOINTS.municipios}/${departamentoId}`;
    const { data } = await baseClient.get(endpoint);
    return data;
  }

  return undefined;
};
