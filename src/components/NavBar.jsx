import React from 'react'

export default function NavBar({title}) {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1 mx-auto">{title}</span>
            </div>
        </nav>
    )
}
