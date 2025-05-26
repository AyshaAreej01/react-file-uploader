# 📁 React File Uploader

A powerful, flexible, and customizable React component for file uploads. Supports multiple files, validation, auto-upload, drag & drop, and custom UI rendering.

![npm](https://www.npmjs.com/package/react-fileflow)
![github](https://github.com/AyshaAreej01/react-file-uploader)



---

## ✨ Features

- ✅ Multiple file uploads
- ✅ Drag & Drop support
- ✅ File type & size validation
- ✅ Auto-upload support
- ✅ Custom UI rendering
- ✅ Callbacks for progress, success, and errors
- ✅ Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install react-fileflow
# or
yarn add react-fileflow
## ✨ Basic Usage
```bash
import FileUploader from 'react-fileflow';
import 'react-fileflow/style.css'; 


function App() {
  const handleUpload = async (file: File) => {
    // Example upload logic
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <FileUploader
      multiple
      accept={['image/png', 'image/jpeg']}
      maxSize={5 * 1024 * 1024} // 5MB
      autoUpload
      onUpload={handleUpload}
      renderFilePreview={(file) => <span>{file.name}</span>}
    />
  );
}

```

## Props
| Prop                | Type                         | Default    | Description                                 |
| ------------------- | ---------------------------- | ---------- | ------------------------------------------- |
| `multiple`          | `boolean`                    | `false`    | Allow multiple file selection               |
| `accept`            | `string[]`                   | `[]`       | Allowed MIME types                          |
| `maxSize`           | `number`                     | `Infinity` | Max file size in bytes                      |
| `autoUpload`        | `boolean`                    | `false`    | Upload immediately after selection          |
| `onUpload`          | `(file: File) => Promise`    | `required` | Upload handler for each file                |
| `onProgress`        | `(progress: number) => void` | `-`        | Callback for upload progress                |
| `onError`           | `(error: Error) => void`     | `-`        | Callback for errors                         |
| `renderFilePreview` | `(file: File) => ReactNode`  | `-`        | Custom preview rendering for selected files |

