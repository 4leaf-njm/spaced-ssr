import React from "react";
import ReactQuill from "@4leaf.njm/react-quill";
import "../../../node_modules/@4leaf.njm/react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const fnStorage = dynamic(import("../../fsStorage"), {
  ssr: false,
});

class Editor extends React.Component {
  render() {
    return (
      <ReactQuill
        className={`editor__form ${
          this.props.componentHeight ? this.props.componentHeight : ""
        }`}
        theme="snow"
        value={this.props.value || ""}
        placeholder={this.props.placeholder || ""}
        readOnly={this.props.readOnly || false}
        modules={Editor.modules}
        formats={Editor.formats}
        onChange={this._editorChangeHandler}
      />
    );
  }

  _editorChangeHandler = (html) => {
    this.props.editorChangeHandler(html);
  };
}

/*
const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = ["12px", "16px", "35px"];
Quill.register(SizeStyle, true);
const SizeFormat = Quill.import("formats/size");
SizeFormat.whitelist = ["12px", "16px", "35px"];
Quill.register(SizeFormat, true);
*/

Editor.modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {
          size: ["small", false, "large", "huge"],
        },
        { color: [] },
        { background: [] },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      image: () => {
        if (typeof document !== "undefined") {
          let fileInput = document.createElement("INPUT");
          fileInput.setAttribute("type", "file");

          fileInput.click();

          fileInput.addEventListener("change", async () => {
            const file = fileInput.files[0];
            const filename = fileInput.files[0].name;

            const filePath = await fnStorage.uploadFile(
              "INSTA-ESTATE/uploads/editorImages",
              filename,
              file
            );

            const db_path = await fnStorage.getSotragePath(filePath);

            const appendTag = document.createElement("IMG");
            appendTag.setAttribute("src", db_path);

            const editor = document.getElementsByClassName("ql-editor");
            editor[0].appendChild(appendTag);
          });
        }
      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
];

export default Editor;
