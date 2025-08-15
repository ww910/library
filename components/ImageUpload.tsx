import React, { useRef, useState } from "react";
import config from "@/lib/config";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import Image from "next/image";
import { toast } from "sonner"
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


function ImageUpload(
  { onFileChange }: { onFileChange: (filePath: string) => void; }
) {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error)

    toast.error("Image uploaded failed.", {
      description: "Your image could not be uploaded. Please try again.",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success("Image uploaded successfully.", {
      description: "Your image has been uploaded successfully.",
    });
  };



  return (
    <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />
      <button className="upload-btn cursor-pointer" onClick={(e) => {
        e.preventDefault();
        if (ikUploadRef.current) {
          // @ts-ignore
          ikUploadRef.current?.click();
        }
      }}>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        <p className="text-base text-light-100">Upload A file</p>
        {file && (<p className="upload-filename">{file.filePath}</p>)}
      </button>

      {file && (
        <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />
      )}

    </ImageKitProvider>
  );
}

export default ImageUpload;
