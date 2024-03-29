import React from 'react'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
function Protected({ children, authentication = true }) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const Authstatus = useSelector(state => state.Auth.status)
    // const Authstatus = true

    useEffect(() => {
        if (authentication && Authstatus !== authentication) {
            navigate("/Login")
        }
        else if (!authentication && Authstatus !== authentication) {
            navigate("/")
        } setLoader(false)
    }, [Authstatus, navigate, authentication])
    return loader?<h1>Loading...</h1>:<>
    {children}
    </>
}

export default Protected
