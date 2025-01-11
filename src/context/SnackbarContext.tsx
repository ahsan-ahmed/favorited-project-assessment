import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type Severity = "success" | "error" | "info" | "warning";

interface SnackbarContextProps {
  showSnackbar: (message: string, severity?: Severity) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as Severity,
  });

  const showSnackbar = (message: string, severity: Severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
