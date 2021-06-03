import React from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { getHigherResProviderPhotoUrl } from './helpers'


const Navbar = () => {
    const {user, username} = useContext(UserContext)
    let highResPhotoURL;
    if (user) {
        highResPhotoURL = getHigherResProviderPhotoUrl(user);
    }
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <button className="btn-logo">DEV</button>
                    </Link>
                </li>
                {username && (
                    <>
                    <li className="push-left">
                        <Link href="/admin">
                            <button className="btn-blue">Write Posts 📝</button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}>
                            <img src={highResPhotoURL} />
                        </Link>
                    </li>
                    </>
                )}
                {!username && (
                    <li>
                        <Link href="/enter">
                        <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
