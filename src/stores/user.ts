import { atom } from "recoil";

export const meState = atom<UserType | null>({
  key: 'meState',
  default: null
});

export const usersState = atom<UserType[]>({
  key: 'usersState',
  default: []
});