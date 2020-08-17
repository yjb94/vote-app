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
import { userState } from './stores/user';

const App: React.FC = () => {
  const { user, setUser } = useUser();

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const polls = snapshot.getLoadable(pollsState).contents;
    localStorage.setItem('polls', JSON.stringify(polls));

    const user = snapshot.getLoadable(userState).contents;
    localStorage.setItem('me', JSON.stringify(user));
  });

  firebaseApp.auth().onAuthStateChanged(async (currentUser) => {
    if (currentUser && !user) {
      setUser({
        id: currentUser.uid,
        email: currentUser.email || '',
        token: await currentUser.getIdToken()
      })
    }
  });

  const routes: RouteType[] = [
    { path: '/create', component: CreatePoll, name: strings["route.create"] },
    { path: '/login', component: Login },
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
