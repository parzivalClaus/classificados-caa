import React, { useRef } from "react";

import { Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { Formik } from "formik";

import * as yup from "yup";

import { signInRequest } from "../../store/modules/auth/actions";

import logo from "../../assets/logo.png";

import background from "../../assets/background.png";

import {
  BackgroundContainer,
  BackgroundImage,
} from "../../components/Background";

import {
  Container,
  Logo,
  FormView,
  FormInput,
  ErrorText,
  SubmitButton,
  SignLink,
  SignLinkText,
} from "./styles";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const passwordRef = useRef();

  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit(values) {
    const { email, password } = values;

    dispatch(signInRequest(email, password));
  }

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container>
        <Logo source={logo} />

        <Formik
          validateOnMount
          onSubmit={(values) => Alert.alert(JSON.stringify(values))}
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Digite um endereço de e-mail válido.")
              .required("O e-mail precisa ser preenchido."),
            password: yup
              .string()
              .required("A senha precisa ser preenchida.")
              .min(6, "A senha precisa ter no mínimo 6 digitos."),
          })}
        >
          {({
            values,
            handleChange,
            isValid,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <FormView>
              <FormInput
                icon="md-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu e-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                value={values.email}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}
              <FormInput
                icon="md-lock"
                secureTextEntry
                placeholder="Sua senha secreta"
                ref={passwordRef}
                returnKeyType="send"
                onSubmitEditing={() => handleSubmit(values)}
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
              />
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}

              <SubmitButton
                disabled={!isValid}
                loading={loading}
                onPress={() => handleSubmit(values)}
              >
                Acessar
              </SubmitButton>
            </FormView>
          )}
        </Formik>

        <SignLink onPress={() => navigation.navigate("Signin")}>
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
