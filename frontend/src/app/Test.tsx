import React from "react";
import { Button, TextInput } from "login-journey";
import RichTextEditor from "./components/common/richtexteditor/richtexteditor";
import { GenrateComponent } from "./util/genarateComponet/GenrateComponent";
import ImageUpload from "./components/common/imageUploader/ImageUpload";
import FileUPload from "./components/common/imageUploader/FileUPload";
export default function Test() {
  const [value, setValue] = React.useState({});

  const handleChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: data, type } = e!.target;

    setValue({ ...value, [inputName]: data });
  };

  const InputFiledArrayObejct = [
    {
      label: "Test image input",
      type: "image",
      name: "image",
      placeholder: "image",
      id: "image",
      onchange: () => "",
    },
    {
      label: "Test file input",
      type: "file",
      name: "file",
      placeholder: "file",
      id: "file",
      onchange: () => "",
    },
    {
      label: "Test checkbox input",
      type: "checkbox",
      name: "checkbox",
      placeholder: "checkbox",
      id: "checkbox",
      onchange: () => "",
    },

    {
      label: "Test date input",
      type: "date",
      name: "date",
      placeholder: "date",
      id: "date",
      onchange: () => "",
    },
    {
      label: "Test tel input",
      type: "tel",
      name: "tel",
      placeholder: "tel",
      id: "tel",
      onchange: () => "",
    },
  ];
  return (
    <>
      <div>Test</div>
      <RichTextEditor />

      <ImageUpload handleChange={handleChange} />
      <FileUPload />
      {/* {InputFiledArrayObejct.map((item, index) => (
        <GenrateComponent htmlInputType={item.type} name={item.name} label={item.label} value={item.name} onChange={item.onchange} />
      ))} */}
    </>
  );
}
