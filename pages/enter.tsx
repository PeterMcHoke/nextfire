import React, { FormEvent, KeyboardEvent } from 'react'
import {auth , googleAuthProvider, firestore } from '../lib/firebase'
import { useCallback, useContext, useEffect, useState } from 'react'
import { UserContext } from '../lib/context'
import { useRouter } from 'next/router'



import debounce from 'lodash.debounce';
import { Router } from 'next/router';


interface Props {
    
}

const SignInButton = () => {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }
    return (
        <button className="btn-google center" onClick={signInWithGoogle}>
            <img src={'/google.png'} /> Sign in with Google
        </button>
    )
};

const SignOutButton = () => {
    return <button onClick={() => auth.signOut()}> Sign Out ✌️</button>
}

interface UsernameProps {
    username: string, 
    isValid: boolean, 
    loading: boolean
}

function UsernameMessage({ username, isValid, loading }:UsernameProps) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

const UsernameForm = () => {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user, username}:any = useContext(UserContext)

    const onSubmit = async (e:FormEvent) => {
        e.preventDefault();
        let router = useRouter();

        //Create refs for both documents
        //Setting the user document ID as the User ID from auth
        const userDoc = firestore.doc(`users/${user.uid}`);
        //Setting the username doc ID as the value from the form
        const usernameDoc = firestore.doc(`usernames/${formValue}`);
        //Set up a batch commit so that we can simultaneously store the user info with the username.
        const batch = firestore.batch();
        batch.set(userDoc, { username: formValue, photoURL: user!.photoURL, displayName: user!.displayName});
        batch.set(usernameDoc, { uid: user.uid});
        await batch.commit();
        router.push(`/${formValue}`);
    };

    const onChange = (e:any) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        //Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    const checkUsername = useCallback(
        debounce( async (username:string) => {
            if(username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed!');
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    return (
        !username && (
          <section>
            <h3>Choose Username</h3>
            <form onSubmit={onSubmit}>
              <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
              <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
              <button type="submit" className="btn-green" disabled={!isValid}>
                Choose
              </button>
    
              <h3>Debug State</h3>
              <div>
                Username: {formValue}
                <br />
                Loading: {loading.toString()}
                <br />
                Username Valid: {isValid.toString()}
              </div>
            </form>
          </section>
        )
      );
}

const Enter = (props: Props) => {
    const {user, username} = useContext(UserContext)
    let router = useRouter();

    return (
        <main>
            {user ? 
                !username ? <UsernameForm /> : <SignOutButton /> 
                : 
                <SignInButton />
            }
        </main>
    )
}




export default Enter;
