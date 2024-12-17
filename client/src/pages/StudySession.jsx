import React from 'react'
import { useParams } from 'react-router-dom'

export default function StudySession() {
    const params = useParams()
    return (
        <div>{
            params.roomId
        }</div>
    )
}
