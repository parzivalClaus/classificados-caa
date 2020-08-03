import React, { useState, useEffect } from 'react';

import SideMenu from '~/components/SideMenu';

import { Container, Content, GridBox, GridTitle, Button } from './styles';

import history from '~/services/history';
import api from '~/services/api';

export default function PendingCompanies() {
  const [page, setPage] = useState(1);
  const [pendingCompanies, setPendingCompanies] = useState();
  const [reg, setReg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function loadCompanies() {
      const companies = await api.get('companies', {
        params: { page },
      });
      setPendingCompanies(
        companies.data.rows.filter((company) => company.active === false)
      );
      setReg(companies.data.count);
      setLoading(false);
    }

    loadCompanies();
  }, [page, reg]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <SideMenu />
      <Content>
        <GridBox>
          <GridTitle>Nome da Empresa</GridTitle>
          <GridTitle>Categoria</GridTitle>
          <GridTitle>Ações</GridTitle>
          {loading === false &&
            pendingCompanies &&
            pendingCompanies.map((company) => (
              <>
                <div class="grid-cell">{company.name}</div>
                <div class="grid-cell">{company.category}</div>
                <div class="grid-cell">
                  <button
                    type="button"
                    onClick={() =>
                      history.push(`/edit-company/${company.id}`, {
                        company,
                      })
                    }
                  >
                    Editar
                  </button>
                </div>
              </>
            ))}
        </GridBox>

        <footer>
          {pendingCompanies ? (
            <>
              <Button
                type="button"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                Página anterior
              </Button>
              <Button
                type="button"
                onClick={handleNextPage}
                disabled={
                  (page !== 1 && reg / 10 <= page) ||
                  (page === 1 &&
                    pendingCompanies &&
                    pendingCompanies.length < 10) ||
                  reg === 10
                }
              >
                Próxima página
              </Button>
            </>
          ) : (
            ''
          )}
        </footer>
      </Content>
    </Container>
  );
}
