import React, { useEffect, useState } from "react";

import fetchGraphQL from "../graphql/fetchGraphql";
import { getVaultsByAccountId } from "../graphql/queries";

export interface Vault {
  wrappedToken: string;
  collateralToken: string;
  registrationTimestamp: string;
  accountId: string;
  lastActivity: {
    id: string;
  };
  id: string;
}

export const useVaults = (account?: string) => {
  const [vaults, setVaults] = useState<Vault[]>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    async function fetchMyVaults() {
      try {
        const myVaults = await fetchGraphQL(getVaultsByAccountId, {
          Account_Id: "a3cCyigH5pLJXcLKRNGFaBnx3a7diTXq9pPZ1TB8XWgqeCQvW", // I don't have vault or btc to create a vault
        });

        console.log("my vaults ", myVaults);

        setVaults(myVaults.data.vaults);
      } catch (e) {
        setError(e);
      }
    }

    if (account) {
      fetchMyVaults();
    }
  }, [account]);

  return { vaults, error };
};
