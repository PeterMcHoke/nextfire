import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

//Allow a user to heart (or like) a post
const HeartButton = ({postRef}) => {
    const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);

    const addHeart = async () => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch()
        batch.update(postRef, {heartCount : increment(1)});
        // We are creating a document in the hearts subcollection with the name
        // and value being the user uid. Somehting like this...
        // x8hno0owdjw32n = { uid: x8hno0owdjw32n}
        batch.set(heartRef, {uid});
        await batch.commit();
    }

    const removeHeart = async () => {
        const batch = firestore.batch();

        batch.update(postRef, {heartCount: increment(-1)});
        batch.delete(heartRef);

        await batch.commit();
    }
    return heartDoc?.exists ? (
        <button onClick={removeHeart}>💔 Unheart</button>
    ) : (
        <button onClick={addHeart}>💗 Heart</button>
    );
}

export default HeartButton
