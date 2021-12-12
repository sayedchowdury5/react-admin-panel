import React from 'react'
import { Button } from 'react-bootstrap'

const LogoutComponent = ({logOut}) => {
    return (
        <div>
            <Button variant="outline-danger" onClick={logOut}>Log Out</Button>
        </div>
    )
}

export default LogoutComponent
