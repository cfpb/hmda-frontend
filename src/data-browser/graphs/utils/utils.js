import { useLocation } from "react-router-dom";
import React, { useMemo } from "react";

export const cloneObject = (obj) => JSON.parse(JSON.stringify(obj));

// Data filtering
export const filterByPeriods = (data, low, high) => {
  if (!data) return data;

  return data.map((obj) => {
    const next = { ...obj };
    next.data = obj.data.slice(low, high);
    return next;
  });
};

// Used to parse the URL and return the query parameter
export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
