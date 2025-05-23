export interface FileUploaderProps {
  onFilesAdded: (files: FileWithPreview[]) => void;
  onFileRemoved: (file: FileWithPreview) => void;
  onUploadComplete?: (file: FileWithPreview) => void;
  onValidationError?: (file: File, error: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  maxFiles?: number;
  autoUpload?: boolean;
  label?: string;
  renderDropzone?: (props: {
    isDragActive: boolean;
    openFileDialog: () => void;
  }) => React.ReactNode;
  renderFile?: (
    file: FileWithPreview,
    onRemove: (file: FileWithPreview) => void
  ) => React.ReactNode;
}
export type FileWithPreview = File & {
  preview?: string;
  id: string;
  progress?: number;
  error?: string;
  uploadStatus?: 'idle' | 'uploading' | 'success' | 'error';
};