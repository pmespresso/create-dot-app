import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { addFile, placeStorageOrder } from "../crust";

interface Props {
  setSizeCallback: (size: number) => void;
  setCidCallback: (cid: string) => void;
}

export function IPFSDrop({ setSizeCallback, setCidCallback }: Props) {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    console.log("acceptedFiles -> ", acceptedFiles);
    // Do something with the files
    const { cid, size } = await addFile(acceptedFiles[0]);

    setSizeCallback(size);
    setCidCallback(cid);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop a file here, or click to select file</p>
      )}
    </div>
  );
}
