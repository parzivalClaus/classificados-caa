import React, { useState, useEffect } from "react";

import SideMenu from "~/components/SideMenu";

import { Container, Content, GridBox, GridTitle, Button } from "./styles";

import api from "~/services/api";

export default function ActiveUsers() {
  const [page, setPage] = useState(1);
  const [activeUsers, setActiveUsers] = useState();
  const [reg, setReg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function loadUsers() {
      const users = await api.get("users", {
        params: { page },
      });
      setActiveUsers(users.data.rows.filter((user) => user.active));
      setReg(users.data.count);
      setLoading(false);
    }

    loadUsers();
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
          <GridTitle>Id</GridTitle>
          <GridTitle>Nome</GridTitle>
          <GridTitle>E-mail</GridTitle>
          {loading === false &&
            activeUsers &&
            activeUsers.map((user) => (
              <>
                <div class="grid-cell">{user.id}</div>
                <div class="grid-cell">{user.name}</div>
                <div class="grid-cell">{user.email}</div>
              </>
            ))}
        </GridBox>

        <footer>
          {activeUsers ? (
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
                  (page === 1 && activeUsers && activeUsers.length < 10) ||
                  reg === 10
                }
              >
                Próxima página
              </Button>
            </>
          ) : (
            ""
          )}
        </footer>
      </Content>
    </Container>
  );
}
