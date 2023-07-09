import { useCallback, useState } from "react";

export default function useHttp() {
  const [meals, setMeals] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const fetchMeals = useCallback(async (configureData) => {
    setIsLoading(true);
    setHasError(null);
    try {
      const response = await fetch(configureData.url, {
        method: configureData.method ? configureData.method : "GET",
        body: configureData.body ? JSON.stringify(configureData.body) : null,
        headers: configureData.headers ? configureData.headers : {},
      });

      if (!response.ok) {
        setHasError(true);
        throw new Error("Request Failed");
      }
      setIsLoading(false);
      const mealsList = await response.json();

      setMeals(mealsList);
    } catch (err) {
      setHasError(err.message || "something went wrong");
    }
    setIsLoading(false);
  }, []);

  return { fetchMeals, meals, hasError, isLoading };
}
