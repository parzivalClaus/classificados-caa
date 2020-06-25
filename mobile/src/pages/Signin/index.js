import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import logo from '../../assets/logo.png';

import background from '../../assets/background.png';

import {
  BackgroundContainer,
  BackgroundImage,
} from '../../components/Background';

import {
  Container,
  Logo,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function Signin({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const registrationRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState('');

  function handleSubmit() {
    setLoading(false);
  }

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container>
        <Logo source={logo} />

        <Form>
          <FormInput
            icon="md-person"
            autoCorrect={false}
            autoCapitalize
            placeholder="Seu nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="md-mail"
            keyboardType="email-address"
            autoCorrect={false}
            ref={emailRef}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="md-lock"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="md-lock"
            secureTextEntry
            placeholder="Confirmação da senha"
            ref={passwordConfirmRef}
            returnKeyType="next"
            onSubmitEditing={() => registrationRef.current.focus()}
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          />

          <FormInput
            icon="md-clipboard"
            secureTextEntry
            placeholder="Matrícula (Opcional)"
            keyboardType="number"
            ref={registrationRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={registration}
            onChangeText={setRegistration}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Cadastrar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('Login')}>
          <SignLinkText>Já sou cadastrado</SignLinkText>
        </SignLink>
      </Container>
    </BackgroundContainer>
  );
}

Signin.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Signin.defaultProps = {
  navigation: null,
};
