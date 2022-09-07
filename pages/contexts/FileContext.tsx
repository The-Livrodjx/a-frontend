import { createContext, useState } from "react";

interface FileProviderProps {
  children: React.ReactNode;
};

interface FileContextInterface {
  file: File | undefined
}

export const FileContext = createContext({} as FileContextInterface);

export default function FileContextProvider({ children }: FileProviderProps) {
  const [file, setFile] = useState();
  return (
    <FileContext.Provider 
      value={{
        file
      }}
    >
      {children}
    </FileContext.Provider>
  )
}