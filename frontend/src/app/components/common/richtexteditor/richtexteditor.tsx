import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function RichTextEditor() {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>

      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
    </div>
  );
}
