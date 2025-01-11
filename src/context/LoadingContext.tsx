import React, { createContext, useContext, useState } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loaderType: "skeleton" | "spinner";
  setLoaderType: (type: "skeleton" | "spinner") => void;
};

type LoadingProviderProps = {
  children: React.ReactNode;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderType, setLoaderType] = useState<"skeleton" | "spinner">(
    "spinner"
  );

  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading: setIsLoading, loaderType, setLoaderType }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
