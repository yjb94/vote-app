import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import strings from '../../strings/strings';
import useUser from '../../hooks/useUser';
import { useHistory } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { me, fetching, logout } = useUser();
  const history = useHistory();

  if (!me) return null;

  const onClick = async () => {
    await logout();
    history.push('/login');
  };

  return (
    <Container
      onClick={onClick}
      loading={fetching}
    >
      {strings["login.logoutButton"]}
    </Container>
  );
};

const Container = styled(Button)`
`;

export default LogoutButton;