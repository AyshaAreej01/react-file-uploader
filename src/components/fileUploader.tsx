import React, { useState } from "react";
import { nanoid } from "nanoid";
import "../App.css";

export interface FileUploaderProps {
  onUpload?: (files: any[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
  multiple?: boolean;
  showUploaded?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  maxFiles = 10,
  acceptedTypes = "*/*",
  multiple = true,
  showUploaded = true,
}) => {
  const [selectedfile, SetSelectedFile] = useState<any[]>([]);
  const [Files, SetFiles] = useState<any[]>([]);
  const [isUploaded, setIsUploaded] = useState(false); // Add this state

const FileUploadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  (e.target as HTMLFormElement).reset();

  if (selectedfile.length > 0) {
    SetFiles((prev) => [...prev, ...selectedfile]);
    if (onUpload) onUpload(selectedfile);
    SetSelectedFile([]);
    setIsUploaded(true); // Set upload status to true
  } else {
    alert("Please select files");
  }
};


  const filesizes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (maxFiles && selectedfile.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();

      reader.onloadend = () => {
        SetSelectedFile((prev) => [
          ...prev,
          {
            id: nanoid(),
            filename: file.name,
            filetype: file.type,
            fileimage: reader.result,
            datetime: file.lastModified?.toLocaleString("en-IN"),
            filesize: filesizes(file.size),
          },
        ]);
      };

      reader.readAsDataURL(file);
    }
  };

  const DeleteSelectFile = (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      SetSelectedFile((prev) => prev.filter((file) => file.id !== id));
    }
  };

  // const FileUploadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   (e.target as HTMLFormElement).reset();

  //   if (selectedfile.length > 0) {
  //     SetFiles((prev) => [...prev, ...selectedfile]);
  //     if (onUpload) onUpload(selectedfile);
  //     SetSelectedFile([]);
  //   } else {
  //     alert("Please select files");
  //   }
  // };

  const DeleteFile = (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      SetFiles((prev) => prev.filter((file) => file.id !== id));
    }
  };

  return (
    <div className="fileupload-view">
      <div className="container">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="title">Multiple File Upload With Preview</h2>
            <form onSubmit={FileUploadSubmit}>
           {!isUploaded && (
  <div className="file-upload-box">
    <input
      type="file"
      onChange={InputChange}
      multiple={multiple}
      accept={acceptedTypes}
    />
    <span>
      Drag and drop or{" "}
      <span className="file-link">Choose your files</span>
    </span>
  </div>
)}


              <div className="preview-box">
                {selectedfile.map(({ id, filename, fileimage, filesize }) => (
                  <div className="file-box" key={id}>
                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => DeleteSelectFile(id)}
                      aria-label="Delete file"
                    >
                      ×
                    </button>
                    {filename.match(/\.(jpg|jpeg|png|gif|svg)$/i) ? (
                      <img src={fileimage} alt={filename} />
                    ) : (
                      <div className="file-icon">📄</div>
                    )}
                    <div className="file-name" title={filename}>
                      {filename}
                    </div>
                    <div className="file-details">
                      <p>{filesize}</p>
                    </div>
                  </div>
                ))}
              </div>

            {isUploaded && showUploaded && Files.length > 0 && (
  <>
    <h3 className="uploaded-heading">Uploaded Files</h3>
    <div className="preview-box uploaded">
      {Files.map(({ id, filename, fileimage, filesize }) => (
        <div className="file-box" key={id}>
          <button
            className="delete-btn"
            onClick={() => DeleteFile(id)}
            aria-label="Delete file"
          >
            ×
          </button>
          {filename.match(/\.(jpg|jpeg|png|gif|svg)$/i) ? (
            <img src={fileimage} alt={filename} />
          ) : (
            <div className="file-icon">📄</div>
          )}
          <div className="file-name" title={filename}>
            {filename}
          </div>
          <div className="file-details">
            <p>{filesize}</p>
          </div>
          <div className="file-actions">
            <a href={fileimage} download={filename}>
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  </>
)}


              <div className="upload-button-container">
                <button type="submit" className="upload-btn">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
