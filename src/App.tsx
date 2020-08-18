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
import EditPoll from './pages/EditPoll';
import Header from './components/header/Header';

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
    { path: '/edit/:pollId', component: withAuth(EditPoll), name: strings["route.edit"] },
    { path: '/login', component: withNoAuth(Login), name: strings["route.login"] },
    { path: '/', component: ListPoll, name: strings["route.listPoll"] },
  ]

  return (
    <AppContainer>
      <GlobalStyle />
      <Header routes={routes} />
      <RouteContainer>
        <Switch>
          {routes.map(route => <Route exact key={route.path} {...route} />)}
          <Route
            path="/"
            render={() => <Redirect to="/" />}
          />
        </Switch>
      </RouteContainer>
    </AppContainer>
  )
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RouteContainer = styled.div`
  width: 50%;
  padding: 32px;
  min-width: 375px;
`;

export default App;
