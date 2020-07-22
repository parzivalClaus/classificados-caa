import React, { useRef, useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

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
  LogoText,
  DataTitleText,
  FormInput,
  SubmitButton,
  PhoneMaskInput,
  ErrorText,
  FormCompany,
  LogoBox,
  HasCompanyText,
  CompanyImageLink,
  CompanyImage,
  BoxInput,
  CompanyTitle,
} from './styles';

function NewCompany({ navigation }) {
  const formikRef = useRef();

  const isFocused = useIsFocused();
  const userId = useSelector(
    (state) => state.user.profile && state.user.profile.id
  );
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(
    company ? 'company.data.category' : ''
  );
  const [categoryError, setCategoryError] = useState(false);
  const [categories, setCategories] = useState([
    { id: '999999', name: 'Selecione uma categoria!' },
  ]);

  const [image, setImage] = useState(null);

  async function loadCategories() {
    const result = await api.get('categories');
    setCategories(result.data.rows);
  }

  async function loadCompany() {
    const result = await api.get(`user/${userId}/company`);
    setCompany(result.data.error ? null : result);
    setCategory('');
    setImage(null);
    loadCategories();
    if (!company) {
      formikRef.current.resetForm();
    }
    setLoading(false);
  }

  async function handleAddCompany(values) {
    if (category === '') {
      setCategoryError(true);
      return Alert.alert('A categoria precisa ser selecionada.');
    }

    const {
      name,
      phone,
      whatsapp,
      email,
      website,
      instagram,
      facebook,
      street,
      number,
      district,
      state,
      zipcode,
      description,
      discount,
    } = values;

    const websiteWithoutProtocol = website.replace(/^\/\/|^.*?:(\/\/)?/, '');

    const data = new FormData();

    if (image) {
      data.append('file', {
        type: 'image/jpeg',
        uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        name: image.split('/')[11],
      });
      const response = await api.post('files', data);

      await api.post(`/companies`, {
        name,
        active: false,
        logo_id: response.data.id,
        creator_id: userId,
        category,
        phone,
        whatsapp,
        email,
        website: websiteWithoutProtocol,
        instagram,
        facebook,
        street,
        number,
        district,
        state,
        zipcode,
        description,
        discount,
      });

      return Alert.alert('Sucesso');
    }

    await api.post(`/companies`, {
      name,
      active: false,
      logo_id: null,
      creator_id: userId,
      category,
      phone,
      whatsapp,
      email,
      website: websiteWithoutProtocol,
      instagram,
      facebook,
      street,
      number,
      district,
      state,
      zipcode,
      description,
      discount,
    });

    return Alert.alert('Sucesso');
  }

  async function getPermissionAsync() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Desculpe, precisamos da sua permissão de câmera pra continuar.'
        );
      }
    }
  }

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        console.tron.log(image);
      }
    } catch (err) {
      // console.tron.log(err);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadCompany();
    getPermissionAsync();
  }, [isFocused]);

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <TopBar>
        <Logo source={logo2} />
      </TopBar>
      <Container>
        {company ? (
          <>
            <HasCompanyText>
              Detectamos que você já possui uma empresa cadastrada. Para
              editá-la, clique no link abaixo:
            </HasCompanyText>
            <CompanyImageLink
              onPress={() =>
                navigation.navigate('EditCompany', { company: company.data })
              }
            >
              {company.data.logo ? (
                <CompanyImage
                  source={{
                    uri: `http://192.168.10.123:3333/files/${company.data.logo.path}`,
                  }}
                  alt={company.name}
                />
              ) : (
                <CompanyTitle>{company.data.name}</CompanyTitle>
              )}
            </CompanyImageLink>
          </>
        ) : (
          <FormCompany disable={loading}>
            <Formik
              innerRef={formikRef}
              validateOnMount
              onSubmit={(values) => Alert.alert(JSON.stringify(values))}
              initialValues={{
                name: '',
                phone: '',
                whatsapp: '',
                email: '',
                website: '',
                instagram: '',
                facebook: '',
                street: '',
                number: '',
                district: '',
                city: '',
                state: '',
                zipcode: '',
                description: '',
                discount: '',
              }}
              validationSchema={yup.object().shape({
                name: yup.string().required('O nome precisa ser preenchido.'),
                description: yup
                  .string()
                  .required('A descrição precisa ser preenchida.'),
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
                  <LogoBox onPress={pickImage}>
                    {image ? (
                      <Image
                        source={{
                          uri: image,
                        }}
                        style={{
                          width: 150,
                          height: 150,
                          borderWidth: 3,
                          borderColor: '#eee',
                        }}
                      />
                    ) : (
                      <LogoText>Enviar Logo</LogoText>
                    )}
                  </LogoBox>

                  <DataTitleText>Dados Gerais</DataTitleText>

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={company ? values.name : 'Nome da Empresa *'}
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.name}
                    onBlur={() => setFieldTouched('name')}
                    onChangeText={handleChange('name')}
                  />

                  {touched.name && errors.name && (
                    <ErrorText>{errors.name}</ErrorText>
                  )}

                  <BoxInput>
                    <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      style={{
                        placeholderColor: { color: '#a0a0a0' },
                        inputAndroid: {
                          color: '#a0a0a0',
                          fontSize: 17,
                        },
                      }}
                      onBlur={() => setFieldTouched('category')}
                      placeholder={{
                        key: company ? company.data.category : '1',
                        label: company
                          ? company.data.category
                          : 'Selecione uma categoria * ',
                        value: company ? company.data.category : 'default',
                      }}
                      value={category}
                      onValueChange={(value) => [
                        setCategory(value),
                        setCategoryError(false),
                      ]}
                      items={categories.map((item) => ({
                        key: item.name,
                        label: item.name,
                        value: item.name,
                      }))}
                    />
                  </BoxInput>

                  {categoryError && category === '' && (
                    <ErrorText>A categoria precisa ser selecionada.</ErrorText>
                  )}
                  <BoxInput>
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
                        company && company.data.phone
                          ? values.phone
                          : 'Telefone '
                      }
                      // onSubmitEditing={() => emailRef.current.focus()}
                      value={values.phone}
                      onBlur={() => setFieldTouched('phone')}
                      onChangeText={handleChange('phone')}
                    />
                  </BoxInput>
                  <BoxInput>
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
                        company && company.data.whatsapp
                          ? values.whatsapp
                          : 'Celular / Whatsapp '
                      }
                      // onSubmitEditing={() => emailRef.current.focus()}
                      value={values.whatsapp}
                      onBlur={() => setFieldTouched('whatsapp')}
                      onChangeText={handleChange('whatsapp')}
                    />
                  </BoxInput>

                  <FormInput
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    placeholder={
                      company && company.data.email ? values.email : 'E-mail'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.email}
                    onBlur={() => setFieldTouched('email')}
                    onChangeText={handleChange('email')}
                  />

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={
                      company && company.data.website ? values.website : 'Site'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.website}
                    onBlur={() => setFieldTouched('website')}
                    onChangeText={handleChange('website')}
                  />

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={
                      company && company.data.instagram
                        ? values.instagram
                        : 'Instagram'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.instagram}
                    onBlur={() => setFieldTouched('instagram')}
                    onChangeText={handleChange('instagram')}
                  />

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={
                      company && company.data.facebook
                        ? values.facebook
                        : 'Facebook'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.facebook}
                    onBlur={() => setFieldTouched('facebook')}
                    onChangeText={handleChange('facebook')}
                  />

                  <DataTitleText>Endereço</DataTitleText>

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={
                      company && company.data.street ? values.street : 'Rua'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.street}
                    onBlur={() => setFieldTouched('street')}
                    onChangeText={handleChange('street')}
                  />

                  <FormInput
                    autoCorrect={false}
                    keyboardType="numeric"
                    returnKeyType="next"
                    placeholder={
                      company && company.data.number ? values.number : 'Número'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.number}
                    onBlur={() => setFieldTouched('number')}
                    onChangeText={handleChange('number')}
                  />

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={
                      company && company.data.district
                        ? values.district
                        : 'Bairro'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.district}
                    onBlur={() => setFieldTouched('district')}
                    onChangeText={handleChange('district')}
                  />
                  <BoxInput>
                    <PhoneMaskInput
                      type="custom"
                      options={{
                        mask: 'AA',
                      }}
                      autoCorrect={false}
                      returnKeyType="next"
                      autoCapitalize="characters"
                      placeholder={
                        company && company.data.state ? values.state : 'Estado '
                      }
                      // onSubmitEditing={() => emailRef.csurrent.focus()}
                      value={values.state}
                      onBlur={() => setFieldTouched('state')}
                      onChangeText={handleChange('state')}
                    />
                  </BoxInput>

                  <BoxInput>
                    <PhoneMaskInput
                      type="zip-code"
                      autoCorrect={false}
                      returnKeyType="next"
                      placeholder={
                        company && company.data.zipcode
                          ? values.zipcode
                          : 'CEP '
                      }
                      // onSubmitEditing={() => emailRef.current.focus()}
                      value={values.zipcode}
                      onBlur={() => setFieldTouched('zipcode')}
                      onChangeText={handleChange('zipcode')}
                    />
                  </BoxInput>
                  <DataTitleText>Sobre a empresa:</DataTitleText>

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    multiline
                    textAlignVertical="top"
                    numberOfLines={10}
                    style={{
                      height: 150,
                      paddingTop: 15,
                      paddingBottom: 15,
                      lineHeight: 50,
                    }}
                    placeholder={company ? values.description : 'Descrição'}
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.description}
                    onBlur={() => setFieldTouched('description')}
                    onChangeText={handleChange('description')}
                  />

                  {touched.description && errors.description && (
                    <ErrorText>{errors.description}</ErrorText>
                  )}

                  <FormInput
                    autoCorrect={false}
                    returnKeyType="next"
                    placeholder={
                      company && company.data.discount
                        ? values.discount
                        : 'Desconto'
                    }
                    // onSubmitEditing={() => emailRef.current.focus()}
                    value={values.discount}
                    onBlur={() => setFieldTouched('discount')}
                    onChangeText={handleChange('discount')}
                  />

                  {company ? (
                    <SubmitButton
                      disabled={!isValid}
                      loading={loading}
                      onPress={() => handleEditCompany(values)}
                    >
                      Editar
                    </SubmitButton>
                  ) : (
                    <SubmitButton
                      disabled={!isValid || values.name === ''}
                      loading={loading}
                      onPress={() => handleAddCompany(values)}
                    >
                      Cadastrar
                    </SubmitButton>
                  )}
                </FormView>
              )}
            </Formik>
          </FormCompany>
        )}
      </Container>
    </BackgroundContainer>
  );
}

export default NewCompany;
