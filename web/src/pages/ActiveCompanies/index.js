import React, { useState, useEffect } from 'react';

import SideMenu from '~/components/SideMenu';

import { Container, Content } from './styles';

import api from '~/services/api';

export default function ActiveCompanies() {
  const [activeCompanies, setActiveCompanies] = useState();

  async function loadCompanies() {
    const companies = await api.get('companies');
    setActiveCompanies(companies.data.rows.filter((company) => company.active));
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <Container>
      <SideMenu />
      <Content>
        {activeCompanies &&
          activeCompanies.map((company) => (
            <>
              <h1>{company.name}</h1>
            </>
          ))}
      </Content>
    </Container>
  );
}
