import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


const AuthCheck = (props) => {
    const { username } = useContext(UserContext);
    return username ? 
        props.children :
        props.fallback || <Link href="/enter"> You gotta sign in first </Link>;
    return (
        <div>
            
        </div>
    )
}

export default AuthCheck;
