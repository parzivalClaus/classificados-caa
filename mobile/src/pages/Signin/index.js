import React, { useRef, useState } from "react";
import { Alert } from "react-native";

import PropTypes from "prop-types";

import { Formik } from "formik";

import * as yup from "yup";

import logo from "../../assets/logo.png";

import background from "../../assets/background.png";

import api from "../../services/api";

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

export default function Signin({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const registrationRef = useRef();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    const { name, email, password, confirmPassword, registration } = values;
    setLoading(true);

    try {
      await api.post("/users", {
        name,
        email,
        password,
        confirmPassword,
        registration,
      });

      setLoading(false);

      navigation.navigate("SignInSuccess");
    } catch (err) {
      Alert.alert(err.response.data.error);
      setLoading(false);
    }
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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            registration: null,
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required("O nome precisa ser preenchido"),
            email: yup
              .string()
              .email("Digite um endereço de e-mail válido.")
              .required("O e-mail precisa ser preenchido."),
            password: yup
              .string()
              .required("A senha precisa ser preenchida.")
              .min(6, "A senha precisa ter no mínimo 6 digitos."),
            confirmPassword: yup
              .string()
              .required("A confirmação de senha precisa ser preenchida")
              .min(6)
              .oneOf([yup.ref("password")], "As senhas não conferem."),
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
                icon="md-person"
                autoCorrect={false}
                autoCapitalize="words"
                placeholder="Seu nome completo"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                value={values.name}
                onBlur={() => setFieldTouched("name")}
                onChangeText={handleChange("name")}
              />
              {touched.name && errors.name && (
                <ErrorText>{errors.name}</ErrorText>
              )}

              <FormInput
                icon="md-mail"
                keyboardType="email-address"
                autoCorrect={false}
                ref={emailRef}
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
                returnKeyType="next"
                onSubmitEditing={() => passwordConfirmRef.current.focus()}
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
              />
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}

              <FormInput
                icon="md-lock"
                secureTextEntry
                placeholder="Confirmação da senha"
                ref={passwordConfirmRef}
                returnKeyType="next"
                onSubmitEditing={() => registrationRef.current.focus()}
                value={values.confirmPassword}
                onBlur={() => setFieldTouched("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <ErrorText>{errors.confirmPassword}</ErrorText>
              )}

              <FormInput
                icon="md-clipboard"
                placeholder="Matrícula (Opcional)"
                keyboardType="numeric"
                ref={registrationRef}
                returnKeyType="send"
                onSubmitEditing={() => handleSubmit(values)}
                value={values.registration}
                onBlur={() => setFieldTouched("registration")}
                onChangeText={handleChange("registration")}
              />

              <SubmitButton
                disabled={!isValid}
                loading={loading}
                onPress={() => handleSubmit(values)}
              >
                Cadastrar
              </SubmitButton>
            </FormView>
          )}
        </Formik>

        <SignLink onPress={() => navigation.navigate("Login")}>
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
