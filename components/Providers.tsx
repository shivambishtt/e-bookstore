"use client"
import React from "react"
import { ImageKitProvider, IKImage } from "imagekitio-next"

export default function Home() {
    return (
        <div className="App">
            <ImageKitProvider
                urlEndpoint="urlEndpoint"
                publicKey="publickey"
                authenticator="authenticator"
            >

            </ImageKitProvider>
        </div>
    )
}