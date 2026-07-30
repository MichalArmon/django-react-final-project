import { Backdrop, CircularProgress } from "@mui/material";

import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext();

let startGlobalLoading = () => {};
let stopGlobalLoading = () => {};

export const showGlobalLoader = () => {
  startGlobalLoading();
};

export const hideGlobalLoader = () => {
  stopGlobalLoading();
};

export default function LoadingProvider({ children }) {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    startGlobalLoading = () => {
      setRequestCount((prev) => prev + 1);
    };

    stopGlobalLoading = () => {
      setRequestCount((prev) => Math.max(0, prev - 1));
    };

    return () => {
      startGlobalLoading = () => {};
      stopGlobalLoading = () => {};
    };
  }, []);

  const isLoading = requestCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}

      <Backdrop
        open={isLoading}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          bgcolor: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(2px)",
        }}
      >
        <CircularProgress size={58} thickness={4} color="primary" />
      </Backdrop>
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return context;
};
