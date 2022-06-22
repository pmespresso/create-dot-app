import { useState, useEffect } from "react";

import * as Kilt from "@kiltprotocol/sdk-js";
import useSporran from "./useSporran";

export function App() {
  const [did, setDid] = useState("");
  const { extensions } = useSporran();

  useEffect(() => {
    const resolveWeb3Name = async () => {
      await Kilt.init({ address: "wss://spiritnet.kilt.io:443" });
      let did = await Kilt.Did.Web3Names.queryDidForWeb3Name("john_doe");
      setDid(did || "unknown");
    };
    resolveWeb3Name();
  });

  return (
    <div className="App">
      john_doe is {did}
      <button onClick={() => console.log(extensions)}>
        console log extensions
      </button>
    </div>
  );
}
