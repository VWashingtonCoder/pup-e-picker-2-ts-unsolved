import { ReactNode, createContext, useState } from "react";

export type ViewContextType = {
  view: string;
  setView: (view: string) => void;
};

export const ViewContext = createContext<ViewContextType>(
  {} as ViewContextType
);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<string>("allDogs");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
