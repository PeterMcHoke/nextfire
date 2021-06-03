import React from 'react'
import { getHigherResProviderPhotoUrl } from './helpers'
interface Props {
    user: any
}

const UserProfile = ({user}: Props) => {
    const highResPhotoURL = getHigherResProviderPhotoUrl(user);
    return (
        <div className="box-center">
            <img src={highResPhotoURL || '/hacker.png'} className="card-img-center" />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayName || 'Anonymous User'}</h1>
        </div>
    )
}

export default UserProfile
