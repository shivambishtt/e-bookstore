"use client"
import React from 'react'

interface EmailTemplateProps {
    username: string;
    order: string
}

function Emailtemplate({ username, order }: EmailTemplateProps) {
    return (
        <div>
            <h1>Welcome, {username}</h1>
            <p>Your order {order} has been successfully placed.</p>
        </div>
    )
}

export default Emailtemplate
