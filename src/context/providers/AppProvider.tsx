import React, { ReactNode } from "react";
import { ProjectProvider } from "../ProjectContext";
import { SnackbarProvider } from "../SnackbarContext";
import { LoadingProvider } from "../LoadingContext";

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <SnackbarProvider>
        <ProjectProvider>{children}</ProjectProvider>
      </SnackbarProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
