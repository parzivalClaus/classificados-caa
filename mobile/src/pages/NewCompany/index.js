import React, { useRef, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import { useSelector } from 'react-redux';

import { Formik } from 'formik';

import * as yup from 'yup';

import logo2 from '../../assets/logo2.png';
import background from '../../assets/background-gray.png';

import api from '../../services/api';

import {
  BackgroundContainer,
  BackgroundImage,
} from '../../components/Background';

import {
  Container,
  TopBar,
  Logo,
  FormView,
  FormInput,
  SubmitButton,
  PhoneMaskInput,
  ErrorText,
  FormCompany,
} from './styles';

function NewCompany() {
  const formikRef = useRef();

  const isFocused = useIsFocused();
  const userId = useSelector(
    (state) => state.user.profile && state.user.profile.id
  );
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(
    company ? 'company.data.category' : ''
  );
  const [categories, setCategories] = useState([
    { id: '999999', name: 'Selecione uma categoria!' },
  ]);

  async function loadCategories() {
    const result = await api.get('categories');
    setCategories(result.data.rows);
  }

  async function loadCompany() {
    try {
      const result = await api.get(`user/${userId}/company`);
      setCompany(result.data.error ? null : result);
      setCategory(company ? company.data.category : '');
      loadCategories();
      formikRef.current.resetForm();
      console.tron.log(company);
      setLoading(false);
    } catch (err) {
      console.tron.log(err);
    }
  }

  function handleSubmitData(values) {
    const { website } = values;
    console.tron.log(values);

    // const urlWithoutProtocol = website.replace(/^\/\/|^.*?:(\/\/)?/, '');
  }

  useEffect(() => {
    setLoading(true);
    loadCompany();
  }, [isFocused]);

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <TopBar>
        <Logo source={logo2} />
      </TopBar>
      <Container>
        <FormCompany>
          <Formik
            enableReinitialize
            innerRef={formikRef}
            validateOnMount
            onSubmit={(values) => Alert.alert(JSON.stringify(values))}
            initialValues={{
              name: company ? company.data.name : '',
              phone: company ? company.data.phone : '',
              whatsapp: company ? company.data.phone : '',
              email: company ? company.data.email : '',
            }}
            validationSchema={yup.object().shape({
              name: yup.string().required('O nome precisa ser preenchido.'),
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
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={company ? values.name : 'Nome da Empresa'}
                  // onSubmitEditing={() => emailRef.current.focus()}
                  value={values.name}
                  onBlur={() => setFieldTouched('name')}
                  onChangeText={handleChange('name')}
                />

                {touched.name && errors.name && (
                  <ErrorText>{errors.name}</ErrorText>
                )}

                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputAndroid: {
                      color: '#a0a0a0',
                      backgroundColor: 'white',
                      borderRadius: 4,
                      padding: 6,
                      marginBottom: 10,
                      borderColor: '#eee',
                      borderWidth: 3,
                      fontSize: 17,
                      paddingLeft: 25,
                    },
                  }}
                  placeholder={{
                    key: company ? company.data.category : '1',
                    label: company
                      ? company.data.category
                      : 'Selecione uma categoria',
                    value: company ? company.data.category : 'default',
                  }}
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                  items={categories.map((item) => ({
                    key: item.name,
                    label: item.name,
                    value: item.name,
                  }))}
                />

                <PhoneMaskInput
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99)',
                  }}
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={company ? values.phone : 'Telefone '}
                  // onSubmitEditing={() => emailRef.current.focus()}
                  value={values.phone}
                  onBlur={() => setFieldTouched('phone')}
                  onChangeText={handleChange('phone')}
                />

                <PhoneMaskInput
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99)',
                  }}
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={
                    company ? values.whatsapp : 'Celular / Whatsapp '
                  }
                  // onSubmitEditing={() => emailRef.current.focus()}
                  value={values.whatsapp}
                  onBlur={() => setFieldTouched('whatsapp')}
                  onChangeText={handleChange('whatsapp')}
                />

                <FormInput
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  placeholder={company ? values.email : 'E-mail'}
                  // onSubmitEditing={() => emailRef.current.focus()}
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                />

                <FormInput
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={company ? values.website : 'Site'}
                  // onSubmitEditing={() => emailRef.current.focus()}
                  value={values.website}
                  onBlur={() => setFieldTouched('website')}
                  onChangeText={handleChange('website')}
                />

                <SubmitButton
                  disabled={!isValid}
                  loading={loading}
                  onPress={() => handleSubmitData(values)}
                >
                  Cadastrar
                </SubmitButton>
              </FormView>
            )}
          </Formik>
        </FormCompany>
      </Container>
    </BackgroundContainer>
  );
}

export default NewCompany;
