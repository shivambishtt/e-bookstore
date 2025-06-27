"use client"
import React from 'react'

interface EmailTemplateProps {
    username: string;
}

function Emailtemplate({ username }: EmailTemplateProps) {
    return (
        <div>
            <h1>Welcome, {username}</h1>
        </div>
    )
}

export default Emailtemplate
