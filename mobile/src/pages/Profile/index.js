import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";

import * as yup from "yup";

import { signOut } from "../../store/modules/auth/actions";
import { updateProfileRequest } from "../../store/modules/user/actions";

import logo2 from "../../assets/logo2.png";
import background from "../../assets/background-gray.png";

import {
  BackgroundContainer,
  BackgroundImage,
} from "../../components/Background";

import {
  TopBar,
  Logo,
  Container,
  LogoutButton,
  LogoutText,
  DataBox,
  DataTittle,
  FormView,
  PasswordBox,
  FormInput,
  ChangePasswordButton,
  ChangePasswordText,
  SubmitButton,
  ErrorText,
} from "./styles";

export default function Profile() {
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState(false);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const loading = useSelector((state) => state.auth.loading);
  const profile = useSelector((state) => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }

  async function handleSubmitData(values) {
    const { name, email, oldPassword, password, confirmPassword } = values;

    dispatch(
      updateProfileRequest({
        id: profile.id,
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <TopBar>
        <Logo source={logo2} />
      </TopBar>
      <Container>
        <DataBox>
          <DataTittle>Dados Pessoais</DataTittle>

          <Formik
            validateOnMount
            onSubmit={(values) => Alert.alert(JSON.stringify(values))}
            initialValues={{
              name: profile ? profile.name : "",
              email: profile ? profile.email : "",
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required("O nome precisa ser preenchido."),
              email: yup
                .string()
                .email("Digite um endereço de e-mail válido.")
                .required("O e-mail precisa ser preenchido."),
              oldPassword: yup
                .string()
                .min(6, "A senha precisa ter no mínimo 6 digitos.")
                .when("password", (password, field) =>
                  password
                    ? field.required("A senha atual precisa ser preenchida")
                    : field
                ),
              password: yup
                .string()
                .when("confirmPassword", (confirmPassword, field) =>
                  confirmPassword ? field.required() : field
                )
                .min(6, "A senha precisa ter no mínimo 6 digitos."),
              confirmPassword: yup
                .string()
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
                  returnKeyType="next"
                  placeholder={values.name}
                  onSubmitEditing={() => emailRef.current.focus()}
                  value={values.name}
                  onBlur={() => setFieldTouched("name")}
                  onChangeText={handleChange("name")}
                />
                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}

                <FormInput
                  icon="md-mail"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={values.email}
                  ref={emailRef}
                  returnKeyType="send"
                  onSubmitEditing={() => handleSubmitData(values)}
                  value={values.email}
                  onBlur={() => setFieldTouched("email")}
                  onChangeText={handleChange("email")}
                />
                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}

                <ChangePasswordButton
                  onPress={() => setNewPassword(!newPassword)}
                >
                  <ChangePasswordText>
                    Quer alterar sua senha?
                  </ChangePasswordText>
                </ChangePasswordButton>

                <PasswordBox disable={!newPassword}>
                  <FormInput
                    icon="md-lock"
                    placeholder="Sua senha atual"
                    ref={oldPasswordRef}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current.focus()}
                    value={values.oldPassword}
                    onBlur={() => setFieldTouched("oldPassword")}
                    onChangeText={handleChange("oldPassword")}
                  />
                  {touched.oldPassword && errors.oldPassword && (
                    <ErrorText>{errors.oldPassword}</ErrorText>
                  )}

                  <FormInput
                    icon="md-lock"
                    placeholder="Nova senha"
                    disable={values.oldPassword === ""}
                    ref={passwordRef}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    value={values.password}
                    onBlur={() => setFieldTouched("password")}
                    onChangeText={handleChange("password")}
                  />
                  {touched.password && errors.password && (
                    <ErrorText>{errors.password}</ErrorText>
                  )}

                  <FormInput
                    icon="md-lock"
                    placeholder="Confirme a nova senha"
                    ref={confirmPasswordRef}
                    disable={values.oldPassword === ""}
                    returnKeyType="send"
                    onSubmitEditing={() => handleSubmitData(values)}
                    value={values.confirmPassword}
                    onBlur={() => setFieldTouched("confirmPassword")}
                    onChangeText={handleChange("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <ErrorText>{errors.confirmPassword}</ErrorText>
                  )}
                </PasswordBox>

                <SubmitButton
                  disabled={!isValid}
                  loading={loading}
                  onPress={() => handleSubmitData(values)}
                >
                  Editar
                </SubmitButton>
              </FormView>
            )}
          </Formik>
        </DataBox>

        <LogoutButton onPress={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </Container>
    </BackgroundContainer>
  );
}
