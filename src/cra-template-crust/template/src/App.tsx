import React, { useCallback, useState } from "react";

import styled from "styled-components";

import logo from "./logo.svg";
import "./App.css";
import { fetchFileAndGetSize, placeStorageOrder } from "./crust";
import { IPFSDrop } from "./components/IPFSDrop";
import { Loader } from "./components/Loader";

const Container = styled.div`
  margin: 0 auto;
  background-color: #1f1f1f;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Button = styled.button`
  background-color: #fc7823;
`;

const Input = styled.input`
  height: 100px;
  width: 100%;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;

  > h4 {
    padding: 0 20px;
  }
`;

const StackHorizontal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    margin-left: 14px;
  }
`;

const StackVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: 14px;
  }
`;

function App() {
  const [CID, setCid] = useState<string>("");
  const [fileSize, setSize] = useState<number>();

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Header>
        <h4>Crust Starter Template</h4>
      </Header>
      <div>
        {statusMessage ? (
          <b>{statusMessage}</b>
        ) : CID ? (
          fileSize ? (
            <div>
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={() => {
                    setLoading(true);
                    placeStorageOrder(CID, fileSize)
                      .then((extrinsicId) => {
                        setStatusMessage(
                          `Success! check file on: https://crust.subscan.io/extrinsic/${extrinsicId}`
                        );
                        setLoading(false);
                      })
                      .catch((extrinsicId) => {
                        setStatusMessage(
                          `Failed! check file on: https://crust.subscan.io/extrinsic/${extrinsicId}`
                        );
                        setLoading(false);
                      });
                  }}
                >
                  Store on Crust
                </button>
              )}
            </div>
          ) : (
            <StackHorizontal>
              <b>CID: </b>
              {CID}
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={async () => {
                    setLoading(true);
                    setSize(await fetchFileAndGetSize(CID));
                    setLoading(false);
                  }}
                >
                  Get File
                </button>
              )}
            </StackHorizontal>
          )
        ) : (
          <StackVertical>
            <p>Input CID:</p>
            <Input
              value={CID}
              onChange={({ target: { value } }) => setCid(value)}
            />
            <b>Or</b>
            <IPFSDrop
              setSizeCallback={(size: number) => setSize(size)}
              setCidCallback={(cid: string) => setCid(cid)}
            />
          </StackVertical>
        )}
      </div>
    </Container>
  );
}

export default App;
