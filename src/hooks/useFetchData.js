import { useEffect, useState, useCallback } from "react";

export default function useFetchData(callbackGetData) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await callbackGetData();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error(`¡Algo salió mal!: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [callbackGetData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { isLoading, data, getData };
}
