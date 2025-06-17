"use client"
import React from "react"
import { ImageKitProvider, IKImage } from "imagekitio-next"
import { SessionProvider } from "next-auth/react"

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT
const publickey = process.env.NEXT_PUBLIC_PUBLIC_KEY

function Providers({ children }: { children: React.ReactNode }) {
    const authenticator = async () => {
        try {
            const response = await fetch("/api/imagekit-auth")
            if (!response.ok) {
                throw new Error(`Failed to authenticate`)
            }
            return response.json()
        } catch (error) {
            throw error
        }
    };

    return (
        <SessionProvider refetchInterval={5 * 60}>
            <ImageKitProvider
                publicKey={publickey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}
            >
                {children}
            </ImageKitProvider>
        </SessionProvider>
    )
}

export default Providers
