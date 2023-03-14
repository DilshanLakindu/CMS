import { useState, useRef } from "react";
import { Container, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { SignIn } from "login-journey";
export default function TextEditor() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    console.log(e);
    console.log(editorRef);
    setValue(value);
  };

  return (
    <Container sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}></Stack>
      {/* <SignIn handleAction={() => {}} signInError={""} termsAndCondition={""} signUproute={""} /> */}
    </Container>
  );
}
