import React, { useEffect } from 'react';
import { tokenMode } from '../../helpers/modeLocalToVercel';
import { Login } from '../Login/Login';
import { Nav } from '../Nav/Nav';
import { Table } from '../Table/Table';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { setToken } from '../../store/reducers/login-reducer';
import { tokenFromURL } from '../../helpers/getTokenFromURL';

const Main = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.login.token);

  useEffect(() => {
    dispatch(setToken(tokenFromURL));
  }, [dispatch, token]);
  return (
    <>
      {tokenMode() === token ? (
        <Login />
      ) : (
        <>
          <Nav />
          <Table />
        </>
      )}
    </>
  );
};

export default Main;
