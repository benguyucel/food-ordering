import axios from 'axios'
import React, { useEffect } from 'react'

const X = () => {
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/63b6a0885663faadde96e304`)
    },[])
    return (
        <div>X</div>
    )
}

export default X