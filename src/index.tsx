import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, MutableSnapshot } from 'recoil';
import 'antd/dist/antd.css';
import { meState } from './stores/user';
import { pollsState } from './stores/poll';

const initializeState = (mutableSnapshot: MutableSnapshot) => {
  const polls: PollType[] = JSON.parse(localStorage.getItem('polls') || '[]');
  mutableSnapshot.set(pollsState, polls);

  const meData = localStorage.getItem('me');
  if(meData) {
    const me: UserType = JSON.parse(meData);
    mutableSnapshot.set(meState, me);
  }
};

ReactDOM.render(
  <RecoilRoot initializeState={initializeState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
