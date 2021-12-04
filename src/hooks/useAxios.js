import { useEffect, useState } from "react";
import axios from "axios";

export default function useAxios(url, method, body = null) {
  const [json, setJson] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      if (!url || (method === "post" && !body)) {
        return;
      }
      setLoading(true);
      setJson(null);
      setError(null);
      console.log(error);
      try {
        const response = await axios[method](url, body);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        setJson(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url, body, method]);

  return { json, error, loading };
}
