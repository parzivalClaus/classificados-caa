import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, StyledForm } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <StyledForm schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="Classificados C.A.A." />
        <div class="inputBox">
          <strong>SEU E-MAIL</strong>
        </div>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <div class="inputBox">
          <strong>SUA SENHA</strong>
        </div>
        <Input name="password" type="password" placeholder="*********" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </StyledForm>
    </Container>
  );
}
