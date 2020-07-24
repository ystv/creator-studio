import { useEffect, useState } from "react";
import { Service } from "../types/Service";
import { Creation } from "../types/Creation";

export interface Creations {
  results: Creation[];
}

const useGetCreationService = () => {
  const [result, setResult] = useState<Service<Creations>>({
    status: "init",
  });

  useEffect(() => {
    fetch("https://api.ystv.co.uk/v1/internal/creator", {
      method: "GET",
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((response) => setResult({ status: "loaded", payload: response }))
      .catch((error) => setResult({ status: "error", error }));
  }, []);
  return result;
};

export default useGetCreationService;
