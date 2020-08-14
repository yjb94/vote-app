import React from 'react';
import styled from "styled-components";
import GlobalStyle from './styles/globalStyles';
import { Switch, Route, Redirect } from "react-router-dom";
import CreatePoll from './pages/CreatePoll';
import strings from './strings/strings';
import ListPoll from './pages/ListPoll';

const App: React.FC = () => {
  const routes: RouteType[] = [
    { path: '/create', component: CreatePoll, name: strings["route.create"] },
    { path: '/', component: ListPoll, name: strings["route.listPoll"] },
  ]

  return (
    <AppContainer>
      <GlobalStyle />
      <Switch>
        {routes.map(route => <Route exact {...route} />)}
        <Route
          path="/"
          render={() => <Redirect to="/"/>}
        />
      </Switch>
    </AppContainer>
  )
};

const AppContainer = styled.div`
`;

export default App;
