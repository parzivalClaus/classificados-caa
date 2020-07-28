import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import api from '~/services/api';

import logo from '~/assets/logo.png';

import { Container } from './styles';
import { toast } from 'react-toastify';

function ActiveUser(props) {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);

  const email = new URLSearchParams(props.location.search).get('email');
  const code = new URLSearchParams(props.location.search).get('code');

  async function ActiveUserFunction() {
    try {
      const response = await api.get(
        `/active-user?email=${email}&code=${code}`
      );

      setMsg(response.data.ok);
      setError(false);
    } catch (err) {
      setError(true);
      setMsg(err.response.data.error);
    }
  }

  useEffect(() => {
    ActiveUserFunction();
  }, []);

  return (
    <Container error={error}>
      <div class="box">
        <img src={logo} alt="Classificados C.A.A." />
        <h1>{msg}</h1>
        {error & <p>Você já pode se logar no App!</p>}
      </div>
    </Container>
  );
}

export default ActiveUser;
