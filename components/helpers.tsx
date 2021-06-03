//@params is an auth user object from Firebase, returns a higher res version of the user.photoURL
//only works for Google
export const getHigherResProviderPhotoUrl = (user: any) => {      
    if (user)
      return user.photoURL.replace('s96-c', 's400-c');
  };

//In order to use other providers use:
// const [user] = useAuthState(auth);
// user.providerData[0].providerId
// to find the provider and then modify the URL differently with if else statements based on provider