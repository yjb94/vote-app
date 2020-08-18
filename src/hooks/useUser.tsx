import firebase from "firebase";
import { useRecoilState } from 'recoil';
import { meState, usersState } from '../stores/user';

const useUser = () => {
  const [me, setMe] = useRecoilState(meState);
  const [users, setUsers] = useRecoilState(usersState);

  const handleError = (error: Error) => {
    alert(error.message || error);
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
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(handleError)
  }

  const logout = async () => {
    localStorage.removeItem('me');
    return await firebase.auth().signOut().catch(handleError);
  }

  const getUser = async (uid: string) => {
    const user = users.find(u => u.id === uid);
    if (user) return user;

    return await firebase.functions().httpsCallable('getUser')({ uid }).then(result => {
      addUser(result.data);
      return result.data;
    });
  }

  return {
    me,
    users,
    setMyData,
    signUp,
    logout,
    getUser
  }
};

export default useUser;
