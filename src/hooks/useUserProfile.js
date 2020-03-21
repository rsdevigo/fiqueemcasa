import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
export default function useUserProfile() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [user, userloading, userError] = useAuthState(firebase.auth());
  useEffect(() => {
    if (!userloading && !user) {
      setLoading(false);
    }
    if (userError) {
      const unsubscribe = function() {
        setError(userError);
        setLoading(false);
      };
      return () => unsubscribe();
    }
    if (!userloading && user) {
      console.log(user.uid);
      const unsubscribe = firebase
        .firestore()
        .collection("users_profiles")
        .doc(user.uid)
        .onSnapshot(
          doc => {
            setUserProfile(doc);
            setLoading(false);
          },
          err => {
            console.log(err);
            setError(err);
            setLoading(false);
          }
        );
      return () => unsubscribe();
    }
    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
  }, [user, userloading, userError]);

  return [error, loading, userProfile, user];
}
