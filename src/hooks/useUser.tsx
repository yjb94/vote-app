import firebase from "firebase";
import { useRecoilState } from 'recoil';
import { meState, usersState } from '../stores/user';
import { useState } from "react";

const useUser = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [me, setMe] = useRecoilState(meState);
  const [users, setUsers] = useRecoilState(usersState);

  const handleError = (error: Error) => {
    alert(error.message || error);
    setFetching(false);
    return error;
  }

  const setMyData = (me: UserType) => {
    addUser(me);
    setMe(me);
  }

  const addUser = (user: UserType) => {
    const found = users.find(u => u === user);
    if(!found) {
      setUsers([...users, user])
    }
  }

  const signUp = async (email: string, password: string) => {
    setFetching(true);
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setFetching(false);
        if(error.code === 'auth/email-already-in-use') {
          return signIn(email, password);
        }
        return handleError(error);
      })
  }
  const signIn = async (email: string, password: string) => {
    setFetching(true);
    return await firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(handleError)
  }

  const logout = async () => {
    setFetching(true);
    localStorage.removeItem('me');
    setMe(null);
    const promise = firebase.auth().signOut().catch(handleError);
    setFetching(false);
    return await promise;
  }

  const getUser = async (uid: string) => {
    const user = users.find(u => u.id === uid);
    if (user) return user;
    
    setFetching(true);
    return await firebase.functions().httpsCallable('getUser')({ uid }).then(result => {
      addUser(result.data);
      return result.data;
    });
  }

  return {
    me,
    users,
    fetching,
    setMyData,
    signUp,
    logout,
    getUser
  }
};

export default useUser;
