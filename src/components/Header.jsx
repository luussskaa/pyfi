import React from 'react'

export default function Header({ normal, bold }) {
    return (
        <h2 className="px-10 pt-10">{normal}<span className="font-bold">{bold}</span>.</h2>
    )
}
