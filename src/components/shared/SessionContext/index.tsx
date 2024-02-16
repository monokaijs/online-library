"use client";
import {createContext, ReactNode} from "react";

export const SessionContext = createContext<SessionData>({
  signedIn: false,
});

interface SessionProviderProps {
  children: ReactNode;
  session: SessionData;
}

export default function SessionProvider({children, session}: SessionProviderProps) {
  return <SessionContext.Provider value={session}>
    {children}
  </SessionContext.Provider>
}
