import React, { useEffect, useState } from "react";

import api from "~/services/api";

import logo from "~/assets/logo.png";

import { Container } from "./styles";

function RecoveryPassword(props) {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const email = new URLSearchParams(props.location.search).get("email");
  const code = new URLSearchParams(props.location.search).get("code");

  async function RecoveryPassFunction() {
    try {
      const response = await api.get(
        `/recovery-password?email=${email}&code=${code}`
      );

      setMsg(
        "Sua nova senha foi enviada para o e-mail. Você poderá alterá-la após o login."
      );
      setError(false);
    } catch (err) {
      setError(true);
      setMsg(err.response.data.error);
    }
  }

  useEffect(() => {
    RecoveryPassFunction();
  }, []);

  return (
    <Container>
      <div class="box">
        <img src={logo} alt="Classificados C.A.A." />
        <h1>{msg}</h1>
      </div>
    </Container>
  );
}

export default RecoveryPassword;
