import { useState, useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
    "X-RapidAPI-Host": "v1-sneakers.p.rapidapi.com",
  },
};

export function useFetch(url) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    const getShoes = () => {
      setIsPending(true);
      try {
        fetch(url, { ...options, signal: controller.signal })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            } else {
              return response.json();
            }
          })
          //data.results
          .then((data) => setData([...data.results]))
          .catch((err) => console.error(err));

        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        }
        setIsPending(false);
        setError("Could not fetch the data");
      }
    };

    getShoes();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
}
