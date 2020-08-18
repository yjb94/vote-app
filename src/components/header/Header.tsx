import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoutButton from '../button/LogoutButton';


const Header: React.FC<{ routes: RouteType[] }> = ({
  routes
}) => {
  const { pathname } = useLocation();
  const route = routes.find(r => pathname.split('/')[1] === r.path.split('/')[1]);
  if (!route)
    return null;

  return (
    <Container>
      {route.name}
      <LogoutButton />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

export default Header;
