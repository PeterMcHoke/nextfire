import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import {auth } from '../../lib/firebase'
import { useRouter } from 'next/router'



export async function getServerSideProps({ query }:any) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);


  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

const SignOutButton = () => {
    let router = useRouter();
    const handleClick = (e) => {
        e.preventDefault();
        auth.signOut();
        router.push('/')
    }
    return <button onClick={e => handleClick(e)} className="center"> Sign Out ✌️</button>
}

export default function UserProfilePage({ user, posts }:any) {
    
  return (
    <main>
      <UserProfile user={user} />
      <SignOutButton />
      <PostFeed posts={posts} />
    </main>
  );
}