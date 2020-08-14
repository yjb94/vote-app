import { atom } from "recoil";

export const pollsState = atom<PollType[]>({
  key: 'pollsState',
  default: []
});