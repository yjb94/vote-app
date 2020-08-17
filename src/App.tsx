import React from 'react';
import styled from "styled-components";
import GlobalStyle from './styles/globalStyles';
import { Switch, Route, Redirect } from "react-router-dom";
import CreatePoll from './pages/CreatePoll';
import strings from './strings/strings';
import ListPoll from './pages/ListPoll';
import { pollsState } from './stores/poll';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

const App: React.FC = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const polls = snapshot.getLoadable(pollsState).contents;
    localStorage.setItem('polls', JSON.stringify(polls));
  });

  const routes: RouteType[] = [
    { path: '/create', component: CreatePoll, name: strings["route.create"] },
    { path: '/', component: ListPoll, name: strings["route.listPoll"] },
  ]

  return (
    <AppContainer>
      <GlobalStyle />
      <Switch>
        {routes.map(route => <Route exact key={route.path} {...route} />)}
        <Route
          path="/"
          render={() => <Redirect to="/" />}
        />
      </Switch>
    </AppContainer>
  )
};

const AppContainer = styled.div`
`;

export default App;
