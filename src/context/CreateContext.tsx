import React, { createContext, useContext } from "react";

export interface INovoContext {
  baseURL: string;
  token: string | null;
}

export const NovoContext = createContext({} as INovoContext);

export const Provider = ({ children }: any) => {
  const baseURL = `https://projeto-login-task-backend-api.onrender.com`;
  const token = localStorage.getItem("@tokenUser");

  return (
    <NovoContext.Provider value={{ baseURL, token }}>
      {children}
    </NovoContext.Provider>
  );
};
