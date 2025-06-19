"use client"
import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState } from "react"

function FileUpload({ onSuccess }: { onSuccess: (response: IKUploadResponse) => void }) {
    const [uploading, setUploading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const onError = (error: { message: string }) => {
        setError(error.message)
        setUploading(false)
    }

    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false)
        setError(null)
        onSuccess(response)
    }
    const handleStartUpload = () => {
        setUploading(true)
        setError(null)
    }
    return (
        <div className="space-y-2">
            <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                validateFile={(file: File) => {
                    const validTypes = ["image/png", "image/jpeg", "image/webp"]
                }}
            />
        </div>
    )
}

export default FileUpload
