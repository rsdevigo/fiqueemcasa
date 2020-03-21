import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase";
export default function useUserProfile() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [user, userloading, userError] = useAuthState(firebase.auth());
  useEffect(() => {
    if (user) {
      const unsubscribe = firebase
        .firestore()
        .collection("users_profiles")
        .doc("dummy_record")
        .onSnapshot(
          doc => {
            setLoading(false);
            setUserProfile(doc);
          },
          err => {
            setError(err);
          }
        );
      return () => unsubscribe();
    }

    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
  }, [user]);

  return [error, loading, userProfile, user];
}
