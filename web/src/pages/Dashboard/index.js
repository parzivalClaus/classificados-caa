import React, { useEffect, useState } from 'react';

import SideMenu from '~/components/SideMenu';

import { Container, GridContainer, MainContent } from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [activeCompanies, setActiveCompanies] = useState();
  const [pendingCompanies, setPendingCompanies] = useState();
  const [activeUsers, setActiveUsers] = useState();
  const [pendingUsers, setPendingUsers] = useState();

  async function updateInfo() {
    const companies = await api.get('companies');

    setActiveCompanies(
      companies.data.rows.filter((company) => company.active).length
    );

    console.tron.log(activeCompanies);

    setPendingCompanies(
      companies.data.rows.filter((company) => !company.active).length
    );

    const users = await api.get('users');

    setActiveUsers(users.data.rows.filter((user) => user.active).length);

    setPendingUsers(users.data.rows.filter((user) => !user.active).length);
  }

  useEffect(() => {
    updateInfo();
  }, []);

  return (
    <Container>
      <SideMenu></SideMenu>

      <MainContent>
        <button onClick={updateInfo}>Atualizar</button>

        <GridContainer>
          <div>
            <strong>
              EMPRESAS <br />
              ATIVAS
            </strong>
            <p>{activeCompanies}</p>
          </div>
          <div>
            <strong>
              EMPRESAS <br />
              AGUARDANDO
            </strong>
            <p
              style={
                pendingCompanies === 0
                  ? { color: '#71D143' }
                  : { color: '#d02a2a' }
              }
            >
              {pendingCompanies}
            </p>
          </div>
          <div>
            <strong>
              USUÁRIOS <br />
              ATIVOS
            </strong>
            <p>{activeUsers}</p>
          </div>
          <div>
            <strong>
              USUÁRIOS <br />
              AGUARDANDO
            </strong>
            <p
              style={
                pendingUsers === 0 ? { color: '#71D143' } : { color: '#d02a2a' }
              }
            >
              {pendingUsers}
            </p>
          </div>
        </GridContainer>
      </MainContent>
    </Container>
  );
}
