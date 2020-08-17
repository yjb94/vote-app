import { atom } from "recoil";

export const userState = atom<UserType | null>({
  key: 'userState',
  default: null
});