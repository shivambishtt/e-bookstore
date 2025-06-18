"use client"
import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState } from "react"

function FileUpload() {
    const [uploading, setUploading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const onError = (error: { message: string }) => {
        setError(error.message)
        setUploading(false)
    }

    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false)
        setError(null)
    }
    return (
        <div>

        </div>
    )
}

export default FileUpload
