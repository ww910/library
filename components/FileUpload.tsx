import React, { useRef, useState } from "react";
import config from "@/lib/config";
import { ImageKitProvider, IKImage, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { toast } from "sonner"
import { cn } from "@/lib/utils";
const { env: { imagekit: {
  publicKey,
  urlEndpoint
} } } = config;



async function authenticator() {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status} : ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
}
interface FileUploadProps {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
  value?: string;
}

function FileUpload({
  onFileChange,
  type,
  accept,
  placeholder,
  folder,
  variant,
  value
}: FileUploadProps) {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>({
    filePath: value || "",
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  }

  const onError = (error: any) => {
    console.log(error)

    toast.error(`${type} uploaded failed.`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  };
  const onSuccess = (res: any) => {
    console.log("File Uploaded successfully:", res);

    setFile(res);
    onFileChange(res.filePath);

    toast.success(`${type} uploaded successfully.`, {
      description: `Your ${type} has been uploaded successfully.`,
    });
  };

  const onValidate = (file: File) => {
    const isImage = type === "image";
    const isVideo = type === "video";

    // size limits
    const max = isImage ? 20 * 1024 * 1024 : 50 * 1024 * 1024;
    if (file.size > max) {
      toast.error("File too large", {
        description: `Please upload a ${isImage ? "image" : "video"} under ${isImage ? "20MB" : "50MB"}.`,
      });
      return false;
    }

    // mime type guard (optional but recommended)
    if (isImage && !file.type.startsWith("image/")) {
      toast.error("Invalid file type", { description: "Please select an image file." });
      return false;
    }
    if (isVideo && !file.type.startsWith("video/")) {
      toast.error("Invalid file type", { description: "Please select a video file." });
      return false;
    }

    return true; // ✅ allow upload
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => {
          setProgress(0);
        }}
        onUploadProgress={({
          loaded, total
        }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        accept={accept}
        folder={folder}
        className="hidden"
      />
      <button className={cn("upload-btn cursor-pointer", styles.button)} onClick={(e) => {
        e.preventDefault();
        if (ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click();
        }
      }}>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        <p className={cn("text-base", styles.placeholder)} >{placeholder}</p>
        {file && (<p className={cn("upload-filename", styles.text)}>{file.filePath}</p>)}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file && (
        (type === 'image') ? (
          <IKImage
            alt={file.filePath ?? ''}
            path={file.filePath ?? undefined}
            width={500}
            height={300} />
        ) : (type === 'video') ? (
          <IKVideo
            controls={true}
            path={file.filePath ?? undefined}
            className="h-96 w-full rounded-xl" />
        ) : null
      )}

    </ImageKitProvider >
  );
}

export default FileUpload;
