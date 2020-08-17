import { useRecoilState } from 'recoil';
import { userState } from '../stores/user';

const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  return {
    user,
    setUser,
  }
};

export default useUser;
