import { ReactNode, createContext, useState } from "react";

export type ViewContextType = {
  view: string;
  isLoading: boolean;
  setView: (view: string) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const ViewContext = createContext<ViewContextType>(
  {} as ViewContextType
);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<string>("allDogs");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ViewContext.Provider value={{ view, setView, isLoading, setIsLoading }}>
      {children}
    </ViewContext.Provider>
  );
};
