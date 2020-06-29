import React from "react";

import PropTypes from "prop-types";

import logo from "../../assets/logo.png";

import background from "../../assets/background.png";

import {
  BackgroundContainer,
  BackgroundImage,
} from "../../components/Background";

import {
  Container,
  Logo,
  SucessTitle,
  SuccessText,
  SignLink,
  SignLinkText,
} from "./styles";

export default function SigninSuccess({ navigation }) {
  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container>
        <Logo source={logo} />

        <SucessTitle>Parabéns, você foi cadastrado com sucesso!</SucessTitle>
        <SuccessText>
          Antes de acessar o sistema, confira sua caixa de e-mails para ativar
          seu usuário.
        </SuccessText>

        <SignLink onPress={() => navigation.navigate("Login")}>
          <SignLinkText>Ir para o Login</SignLinkText>
        </SignLink>
      </Container>
    </BackgroundContainer>
  );
}

SigninSuccess.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SigninSuccess.defaultProps = {
  navigation: null,
};
