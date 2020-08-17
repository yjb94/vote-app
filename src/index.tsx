import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, MutableSnapshot } from 'recoil';
import 'antd/dist/antd.css';
import { pollsState } from './stores/poll';

const initializeState = (mutableSnapshot: MutableSnapshot) => {
  const polls: PollType[] = JSON.parse(localStorage.getItem('polls') || '[]');
  mutableSnapshot.set(pollsState, polls);
};

ReactDOM.render(
  <RecoilRoot initializeState={initializeState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
);
