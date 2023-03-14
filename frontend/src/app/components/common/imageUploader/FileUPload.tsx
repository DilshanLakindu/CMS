import React from "react";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation fileUpload($file: Upload!) {
    fileUpload(file: $file) {
      movieno
    }
  }
`;
const FileUPload = () => {
  console.log("file upload");
  const [fileUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  const handleFileChange = (e: any) => {
    const file = e.target.files;
    if (!file) return;
    console.log("file", file[0]);
    fileUpload({ variables: { file } });
  };
  return (
    <>
      <input type="file" name="GraphQLUploadForMedium" onChange={handleFileChange} />
    </>
  );
};
export default FileUPload;
