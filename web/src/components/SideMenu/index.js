import React from 'react';

import { useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo2.png';

import { Content } from './styles';

function SideMenu() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Content>
      <div class="topContent">
        <img src={logo} alt="Classificados C.A.A." />
        <hr />

        <ul>
          <p>EMPRESAS</p>
          <li>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="companiesActive"
              to="/active-companies/"
            >
              ATIVAS
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="companiesPending"
              to="/pending-companies/"
            >
              AGUARDANDO
            </NavLink>
          </li>
        </ul>

        <ul>
          <p>USUÁRIOS</p>
          <li>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="companiesActive"
              to="/active-companies/"
            >
              ATIVOS
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ color: '#000' }}
              id="companiesPending"
              to="/pending-companies/"
            >
              AGUARDANDO
            </NavLink>
          </li>
        </ul>
      </div>

      <div class="bottomContent">
        <button onClick={handleSignOut}>Sair do Sistema</button>
      </div>
    </Content>
  );
}

export default SideMenu;
