import React, { useState } from "react";
import { Alert } from "react-native";

import { Formik } from "formik";

import * as yup from "yup";

import api from "../../services/api";

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

export default function LostPassword({ navigation }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    const { email } = values;

    try {
      const result = await api.post("/recovery-password", { email });
      Alert.alert(
        "Chave enviada com sucesso!",
        "Confira seu e-mail e siga as instruções para recuperar sua senha."
      );
    } catch (err) {
      Alert.alert(err.response.data.error);
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
            email: "",
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email("Digite um endereço de e-mail válido.")
              .required("O e-mail precisa ser preenchido."),
          })}
        >
          {({
            values,
            handleChange,
            isValid,
            errors,
            setFieldTouched,
            touched,
            resetForm,
          }) => (
            <FormView>
              <FormInput
                icon="md-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu e-mail"
                returnKeyType="send"
                onSubmitEditing={() => [handleSubmit(values), resetForm()]}
                value={values.email}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
              />
              {touched.email && errors.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}

              <SubmitButton
                disabled={!isValid}
                loading={loading}
                onPress={() => [handleSubmit(values), resetForm()]}
              >
                Enviar
              </SubmitButton>
            </FormView>
          )}
        </Formik>

        <SignLink onPress={() => navigation.navigate("Login")}>
          <SignLinkText>Voltar pro login</SignLinkText>
        </SignLink>
      </Container>
    </BackgroundContainer>
  );
}
