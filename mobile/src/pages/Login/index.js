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

export default function Login({ navigation }) {
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
            keyboardType="email-address"
            autoCorrect={false}
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
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('Signin')}>
          <SignLinkText>Não tenho cadastro</SignLinkText>
        </SignLink>
      </Container>
    </BackgroundContainer>
  );
}

Login.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Login.defaultProps = {
  navigation: null,
};
