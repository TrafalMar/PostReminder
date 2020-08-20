import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./UploadFile.module.css";

function UploadFile() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (accptedFiles) => {
      setFiles(
        accptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div style={{ textAlign: "center", boxSizing: "border-box" }}>
        <img src={file.preview} style={{ width: "100%" }} alt="preview"></img>
      </div>
    </div>
  ));

  return (
    <div>
      <div className={classes.UploadFile} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop image here</p>
      </div>
      <div>{images}</div>
    </div>
  );
}

export default UploadFile;
