import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

import { useExtension } from "./useExtension";

export const useAccount = () => {
  const { currentAccount, setCurrentAccount } = useContext(AppContext);
  const { allAccounts } = useExtension();

  const onSelectAccount = useCallback(
    async (account: InjectedAccountWithMeta) => {
      if (!allAccounts) {
        return;
      }

      for (let i = 0; i < allAccounts?.length; i++) {
        if (allAccounts[i].address === account.address) {
          setCurrentAccount(allAccounts[i]);
        }
      }
    },
    [allAccounts]
  );

  useEffect(() => {
    allAccounts && onSelectAccount(allAccounts[0]);
  }, [allAccounts]);

  return { currentAccount, onSelectAccount };
};
