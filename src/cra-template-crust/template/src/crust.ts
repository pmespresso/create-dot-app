import { ApiPromise, WsProvider } from "@polkadot/api";
import { typesBundleForPolkadot, crustTypes } from "@crustio/type-definitions";
import { Keyring } from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import { Buffer } from 'buffer'
import { create } from "ipfs-http-client";
import { ethers } from "ethers";

export async function fetchFileAndGetSize(cid: string): Promise<number> {

      const pair = ethers.Wallet.createRandom();
      const sig = await pair.signMessage(pair.address);
      const authHeaderRaw = `eth-${pair.address}:${sig}`;
      const authHeader = Buffer.from(authHeaderRaw).toString("base64");
      const ipfsW3GW = "https://crustipfs.xyz";

      // 1. Create IPFS instance
      const ipfs = create({
        url: `${ipfsW3GW}/api/v0`,
        headers: {
          authorization: `Basic ${authHeader}`,
        },
      });

         console.log(cid);

         const fileStat = await ipfs.files.stat("/ipfs/" + cid.toString());

         console.log(fileStat);
    // const data = await fetch(`https://crustipfs.xyz/ipfs/${cid}`);

    // console.log("data -> ", data.body);

    // return data.size;
    return fileStat.cumulativeSize;
}

export async function addFile(fileContent: any) {
  // 0. Construct web3 authed header
  // Now support: ethereum-series, polkadot-series, solana, elrond, flow, near, ...
  // Let's take ethereum as example
  const pair = ethers.Wallet.createRandom();
  const sig = await pair.signMessage(pair.address);
  const authHeaderRaw = `eth-${pair.address}:${sig}`;
  const authHeader = Buffer.from(authHeaderRaw).toString("base64");
  const ipfsW3GW = "https://crustipfs.xyz";

  // 1. Create IPFS instance
  const ipfs = create({
    url: `${ipfsW3GW}/api/v0`,
    headers: {
      authorization: `Basic ${authHeader}`,
    },
  });

  // 2. Add file to ipfs
  const { cid } = await ipfs.add(fileContent);
  console.log('size => ', fileContent.size)

  // 3. Get file status from ipfs
  const fileStat = await ipfs.files.stat("/ipfs/" + cid.toString());

  return {
    cid: cid.toString(),
    size: fileStat.cumulativeSize,
  };
}

// Create global chain instance
// prod: "wss://rpc.crust.network";
const crustChainEndpoint = "wss://api.decloudf.com"; // Maxwell testnet
const api = new ApiPromise({
  provider: new WsProvider(crustChainEndpoint),
  typesBundle: typesBundleForPolkadot,
});

export async function placeStorageOrder(fileCid: string, fileSize: number) {
  // 1. Construct place-storage-order tx
//   const fileCid = "Qm123"; // IPFS CID, take `Qm123` as example
//   const fileSize = 2 * 1024 * 1024 * 1024; // Let's say 2 gb(in byte)
  const tips = 0;
  const memo = "";
  const tx = api.tx.market.placeStorageOrder(fileCid, fileSize, tips, memo);

  // 2. Load seeds(account)
  // this is just a test demo account, obviously don't paste your seed into source code ever.
  const seeds =
    "fever fashion pet thought ranch useful wash describe collect keep crew artwork";
  const kr = new Keyring({ type: "sr25519" });
  const krp = kr.addFromUri(seeds);

  // 3. Send transaction
  await api.isReadyOrError;
  return new Promise((resolve, reject) => {
    tx.signAndSend(krp, ({ events = [], status }) => {
      console.log(`💸  Tx status: ${status.type}, nonce: ${tx.nonce}`);

      if (status.isInBlock) {
        events.forEach(({ event: { method, section } }) => {
          console.log({ method, section });
          if (method === "ExtrinsicSuccess") {
            console.log(`✅  Place storage order success!`);
            resolve(tx.hash);
          }
        });
      } else {
        // Pass it
      }
    }).catch((e) => {
      reject(tx.hash);
    });
  });
}
