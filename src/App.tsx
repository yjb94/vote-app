import React from 'react';
import styled from "styled-components";
import GlobalStyle from './styles/globalStyles';
import { Switch, Route, Redirect } from "react-router-dom";
import CreatePoll from './pages/CreatePoll';
import strings from './strings/strings';
import ListPoll from './pages/ListPoll';
import { pollsState } from './stores/poll';
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import Login from './pages/Login';
import { firebaseApp } from './modules/firebase';
import useUser from './hooks/useUser';
import { meState } from './stores/user';
import { withAuth } from './hoc/withAuth';
import { withNoAuth } from './hoc/withNoAuth';

const App: React.FC = () => {
  const { me, setMyData } = useUser();

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const polls = snapshot.getLoadable(pollsState).contents;
    localStorage.setItem('polls', JSON.stringify(polls));

    const me = snapshot.getLoadable(meState).contents;
    localStorage.setItem('me', JSON.stringify(me));
  });

  firebaseApp.auth().onAuthStateChanged(async (currentUser) => {
    if (currentUser && !me) {
      setMyData({
        id: currentUser.uid,
        email: currentUser.email || '',
      })
    }
  });

  const routes: RouteType[] = [
    { path: '/create', component: withAuth(CreatePoll), name: strings["route.create"] },
    { path: '/login', component: withNoAuth(Login) },
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
