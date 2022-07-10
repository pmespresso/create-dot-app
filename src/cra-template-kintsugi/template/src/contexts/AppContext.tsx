import React, { useState, useEffect, createContext } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

export const AppContext = createContext({
  currentAccount: null,
  setCurrentAccount: () => null,
} as any);

interface Props {
  children: React.ReactNode;
}

export function AppContextProvider(props: Props) {
  const [currentAccount, setCurrentAccount] =
    useState<InjectedAccountWithMeta | null>(null);

  return (
    <AppContext.Provider value={{ currentAccount, setCurrentAccount }}>
      {props.children}
    </AppContext.Provider>
  );
}
