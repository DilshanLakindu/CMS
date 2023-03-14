import { Box, Button, Container, IconButton, ImageList, ImageListItem, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
const fileTypes = ["JPG", "PNG", "GIF"];

interface ImageUploadProps {
  handleChange: () => void;
}

export default function ImageUpload({ handleChange }: ImageUploadProps) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    maxFiles: 8,
    maxSize: 5242880,
    multiple: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
    },
    onDrop: (acceptedFiles: any) => {
      console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeFile = (file: any) => {
    const newFiles = files.filter((f: any) => f.name !== file.name);
    setFiles(newFiles);
  };

  console.log(files);
  const thumbs = files.map((file: any) => (
    <ImageListItem key={file.img}>
      <Box sx={{ position: "absolute", right: 0 }}>
        <IconButton aria-label="delete" size="small" color="error" onClick={() => removeFile(file)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <img
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
        loading="lazy"
      />
    </ImageListItem>
  ));

  return (
    <Container maxWidth="sm">
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            border: "3px",
            borderColor: isFocused || isDragActive ? "purple" : "black",
            borderStyle: "dashed",
            padding: "10px",
            "&:Hover": {
              borderColor: "purple",
            },
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input {...getInputProps()} />
          {
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h6">{isDragActive ? " Drop Here ⏬" : "Drag and drop⏬"}</Typography>
              {isDragActive ? null : <Typography variant="caption">Click to Add an assest or drag and drop one in this area Maximum(8 Images)</Typography>}
            </Stack>
          }
        </Box>

        <Typography variant="h6"></Typography>
        <ImageList sx={{ width: 400, height: 400 }} cols={3} rowHeight={120}>
          {thumbs}
        </ImageList>
      </Stack>
    </Container>
  );
}
