import { useEffect, useState } from 'react';

/**
 * @typedef {import('../models/AxiosCall').AxiosCall} AxiosCall
 */

/**
 * Hook para manejar peticiones HTTP con Axios y control de carga/cancelación.
 *
 * @returns {{
 *  isLoading: boolean,
 *  setIsLoading: import('react').Dispatch<import('react').SetStateAction<boolean>>,
 *  callEndpoint: (axiosCall: AxiosCall) => Promise<any>
 * }}
 */
const useFetchAndLoad = () => {
  const [isLoading, setIsLoading] = useState(false);
  let controller = null;

  /**
   * Ejecuta una llamada Axios controlada con estado de carga y cancelación.
   * @param {AxiosCall} axiosCall - Objeto con la promesa y el controlador opcional
   * @returns {Promise<any>} Respuesta o error del endpoint
   */
  const callEndpoint = async (axiosCall) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setIsLoading(true);

    try {
      const result = await axiosCall.call;
      return result.data;
    } catch (err) {
      return (
        err?.response?.data || {
          success: false,
          message: err.message,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cancela la petición actual.
   */
  const cancelEndpoint = () => {
    setIsLoading(false);
    if (controller) controller.abort();
  };

  useEffect(() => cancelEndpoint, []);

  return { isLoading, setIsLoading, callEndpoint };
};

export default useFetchAndLoad;
