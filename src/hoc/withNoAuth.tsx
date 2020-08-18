
import React from 'react';
import { useHistory } from 'react-router-dom';
import useUser from '../hooks/useUser';

// HOC for pages with not authenticated users
export const withNoAuth = (ComposedComponent: React.FC) => {
  return (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => {
    const { me } = useUser();
    const history = useHistory();

    if (me) {
      history.push('/')
      return null;
    }

    return <ComposedComponent {...props} />;
  }
}