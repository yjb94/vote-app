import React from 'react';
import styled from "styled-components";
import LoginForm from '../components/form/LoginForm';

const Login: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default Login;
