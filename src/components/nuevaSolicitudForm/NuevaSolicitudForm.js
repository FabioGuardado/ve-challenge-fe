"use client";

import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  getAllDepartamentos,
  getMunicipiosByDepartamentoId,
} from "@/api/catalogos";
import useFetchData from "@/hooks/useFetchData";

import styles from "./NuevaSolicitudForm.module.css";
import { createSolicitud } from "@/api/solicitudes";

export default function NuevaSolicitudForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const [archivos, setArchivos] = useState(undefined);

  const { data: departamentosData } = useFetchData(getAllDepartamentos);


  const selectedDepartamento = watch("departamento");

  const selectedDepartamentoId = useMemo(() => {
    return departamentosData?.find(
      (departamento) => departamento.nombre === selectedDepartamento
    )._id;
  }, [selectedDepartamento]);

  const getMunicipiosRequest = useCallback(
    () => getMunicipiosByDepartamentoId(selectedDepartamentoId),
    [selectedDepartamentoId]
  );

  const { isLoading: isMunicipiosDataLoading, data: municipiosData } =
    useFetchData(getMunicipiosRequest);

  const handleInputChange = (e) => {
    setArchivos(e);
  };

  const customSubmitAction = handleSubmit(async (data) => {
    try {
      const filesObject = new Object;

      for(let index = 0; index < archivos.length; index++) {
        filesObject.append();
      }

      const response = await createSolicitud(data);
    } catch (error) {
      console.error(`¡Algo salió mal!: ${error}`);
    }
  });

  return (
    <div className={styles.nuevaSolicitudFormContainer}>
      <form onSubmit={customSubmitAction}>
        <div className={styles.nuevaSolicitudFormGrid}>
          <div>
            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="nombres"
                type="text"
                variant="outlined"
                label="Nombres"
                error={errors?.nombres}
                className={styles.nuevaSolicitudFormItemField}
                {...register("nombres", {
                  required: { value: true, message: "Este campo es requerido" },
                })}
              ></TextField>
              {errors?.nombres ? <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.nombres?.message}</p> : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="apellidos"
                type="text"
                variant="outlined"
                label="Apellidos"
                error={errors?.apellidos}
                className={styles.nuevaSolicitudFormItemField}
                {...register("apellidos", {
                  required: { value: true, message: "Este campo es requerido" },
                })}
              ></TextField>
              {errors?.apellidos ? <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.apellidos?.message}</p> : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="email"
                type="text"
                variant="outlined"
                label="Correo Electrónico"
                error={errors?.email}
                className={styles.nuevaSolicitudFormItemField}
                {...register("email", {
                  required: { value: true, message: "Este campo es requerido" },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}$/,
                    message:
                      "Este correo electrónico no cumple con el formato: ejemplo@ejemplo.com",
                  },
                })}
              ></TextField>
              {errors?.email ? (
                <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.email?.message}</p>
              ) : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="telefono"
                type="number"
                variant="outlined"
                label="Teléfono"
                error={errors?.telefono}
                className={styles.nuevaSolicitudFormItemField}
                {...register("telefono", {
                  required: { value: true, message: "Este campo es requerido" },
                  pattern: {
                    value: /^(7|2|6)\d{7}$/,
                    message: "Este número de teléfono no es válido",
                  },
                })}
              ></TextField>
              {errors?.telefono ? <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.telefono?.message}</p> : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <FormControl fullWidth>
                <InputLabel id="tipoIdentificacionSelect">
                  Tipo de Identificación
                </InputLabel>
                <Select
                  labelId="tipoIdentificacionSelect"
                  id="tipoIdentificacionSelect"
                  label="Tipo de Identificación"
                  name="tipoIdentificacion"
                  error={errors?.tipoIdentificacion}
                  className={styles.nuevaSolicitudFormItemField}
                  {...register("tipoIdentificacion", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                >
                  <MenuItem value="DUI">DUI</MenuItem>
                  <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                </Select>
              </FormControl>
              {errors?.tipoIdentificacion ? (
                <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.tipoIdentificacion?.message}</p>
              ) : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="numeroIdentificacion"
                type="text"
                variant="outlined"
                label="Número de identificación"
                disabled={!watch("tipoIdentificacion")}
                error={errors?.numeroIdentificacion}
                className={styles.nuevaSolicitudFormItemField}
                {...register("numeroIdentificacion", {
                  required: { value: true, message: "Este campo es requerido" },
                  validate: (value) => {
                    const selectedTipoIdentificacion =
                      watch("tipoIdentificacion");
                    if (selectedTipoIdentificacion === "DUI") {
                      const duiRegex = new RegExp(/^[0-9]{9}$/);
                      if (duiRegex.test(value)) {
                        return true;
                      } else {
                        return `El número de identificación introducido no cumple con el formato de tipo de identificación ${selectedTipoIdentificacion}: 9 números enteros sin guíón.`;
                      }
                    } else if (selectedTipoIdentificacion === "Pasaporte") {
                      const pasaporteRegex = new RegExp(/^[A-Z]{2}\d{7}$/);
                      if (pasaporteRegex.test(value)) {
                        return true;
                      } else {
                        return `El número de identificación introducido no cumple con el formato de tipo de identificación ${selectedTipoIdentificacion}: dos letras mayúsculas al inicio y 7 números enteros.`;
                      }
                    }
                  },
                })}
              ></TextField>
              {errors?.numeroIdentificacion ? (
                <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.numeroIdentificacion?.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <div className={styles.nuevaSolicitudFormItemContainer}>
              <FormControl fullWidth>
                <InputLabel id="departamentoSelect">Departamento</InputLabel>
                <Select
                  labelId="departamentoSelect"
                  id="departamentoSelect"
                  label="Departamento"
                  name="departamento"
                  error={errors?.departamento}
                  className={styles.nuevaSolicitudFormItemField}
                  {...register("departamento", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                >
                  {departamentosData?.map((departamento) => (
                    <MenuItem
                      key={departamento._id}
                      value={departamento.nombre}
                    >
                      {departamento.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.departamento ? (
                <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.departamento?.message}</p>
              ) : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <FormControl fullWidth>
                <InputLabel id="municipioSelect">Municipio</InputLabel>
                <Select
                  labelId="municipioSelect"
                  id="municipioSelect"
                  label="Municipio"
                  name="municipio"
                  disabled={!selectedDepartamento || isMunicipiosDataLoading}
                  error={errors?.municipio}
                  className={styles.nuevaSolicitudFormItemField}
                  {...register("municipio", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                >
                  {municipiosData?.map((municipio) => (
                    <MenuItem key={municipio._id} value={municipio.nombre}>
                      {municipio.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.municipio ? <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.municipio?.message}</p> : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="direccion"
                type="text"
                variant="outlined"
                label="Dirección"
                error={errors?.direccion}
                className={styles.nuevaSolicitudFormItemField}
                {...register("direccion", {
                  required: { value: true, message: "Este campo es requerido" },
                })}
              ></TextField>
              {errors?.direccion ? <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.direccion?.message}</p> : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <TextField
                name="ingresosMensuales"
                type="number"
                variant="outlined"
                label="Ingresos Mensuales"
                error={errors?.ingresosMensuales}
                className={styles.nuevaSolicitudFormItemField}
                {...register("ingresosMensuales", {
                  required: { value: true, message: "Este campo es requerido" },
                  validate: {
                    value: (value) =>
                      (value >= 300 && value <= 5000) ||
                      "La cantidad introducida debe estar dentro del rango: $300 - $5000",
                  },
                })}
              ></TextField>
              {errors?.ingresosMensuales ? (
                <p className={styles.nuevaSolicitudFormErrorMessage}>{errors?.ingresosMensuales?.message}</p>
              ) : null}
            </div>

            <div className={styles.nuevaSolicitudFormItemContainer}>
              <input
              multiple
                name="documentoIdentidad"
                type="file"
                label="Documento de Identidad"
                error={errors?.documentoIdentidad}
                className={styles.nuevaSolicitudFormItemField}
                onChange={handleInputChange}
                
              />
            </div>
          </div>
        </div>
        <div className={styles.nuevaSolicitudFormBtnContainer}>
          <button type="submit" className={styles.nuevaSolicitudFormBtn}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
