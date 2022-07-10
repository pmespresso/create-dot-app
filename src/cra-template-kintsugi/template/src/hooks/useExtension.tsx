import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
  web3ListRpcProviders,
  web3UseRpcProvider,
} from "@polkadot/extension-dapp";
import {
  InjectedAccountWithMeta,
  InjectedExtension,
} from "@polkadot/extension-inject/types";
import { useEffect, useState } from "react";

// declare global {
//   interface Window {
//     injectedWeb3: any;
//   }
// }
export const useExtension = () => {
  const [allInjected, setAllInjected] = useState<InjectedExtension[]>();
  const [allAccounts, setAllAccounts] = useState<InjectedAccountWithMeta[]>();

  useEffect(() => {
    async function fetchExtensionAccounts() {
      // returns an array of all the injected sources
      // (this needs to be called first, before other requests)
      setAllInjected(await web3Enable("Kintsugi Dashboard"));

      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      setAllAccounts(await web3Accounts());
    }

    fetchExtensionAccounts();
  }, []);

  return { allInjected, allAccounts };
};
