import * as firebase from "firebase";
import { useRecoilState } from 'recoil';
import { userState } from '../stores/user';

const useUser = () => {
  const [me, setMe] = useRecoilState(userState);

  const handleError = (error: Error) => {
    alert(error.message || error);
    return error;
  }

  const signUp = async (email: string, password: string) => {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(handleError)
  }

  const logout = async () => {
    localStorage.removeItem('me');
    return await firebase.auth().signOut().catch(handleError);
  }

  return {
    me,
    setMe,
    signUp,
    logout
  }
};

export default useUser;
