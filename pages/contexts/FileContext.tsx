import { createContext, useCallback, useState } from "react";

interface FileProviderProps {
  children: React.ReactNode;
};

interface FileContextInterface {
  file: File[] | undefined;
  handleFile: (value: File[] | undefined) => void;
  hasPreview: boolean;
  setHasPreview: (value: boolean) => void;
}

export const FileContext = createContext({} as FileContextInterface);

export default function FileContextProvider({ children }: FileProviderProps) {
  const [file, setFile] = useState<File[]>();
  const [hasPreview, setHasPreview] = useState(false);

  function handleFile(value: File[] | undefined) {
    setFile(value);
  }

  return (
    <FileContext.Provider 
      value={{
        file,
        handleFile,
        hasPreview,
        setHasPreview
      }}
    >
      {children}
    </FileContext.Provider>
  )
}