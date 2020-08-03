import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image } from 'react-native';

import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { useSelector } from 'react-redux';

import * as yup from 'yup';

import {
  Container,
  FormView,
  DataTitleText,
  FormInput,
  SubmitButton,
  PhoneMaskInput,
  ErrorText,
  FormCompany,
  LogoBox,
  LogoText,
  BoxInput,
} from './styles';

import api from '../../../services/api';

import { API_URL } from '@env';

import background from '../../../assets/background-gray.png';

import {
  BackgroundContainer,
  BackgroundImage,
} from '../../../components/Background';

const EditCompany = ({ route, navigation }) => {
  const formikRef = useRef();
  const { company } = route.params;
  const [categoryError, setCategoryError] = useState(false);
  const [category, setCategory] = useState(company ? company.category : '');
  const userId = useSelector(
    (state) => state.user.profile && state.user.profile.id
  );
  const [categories, setCategories] = useState([
    { id: '999999', name: 'Selecione uma categoria!' },
  ]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCategories() {
    const result = await api.get('categories');
    setCategories(result.data.rows);
    setLoading(false);
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
      }
    } catch (err) {
      // console.tron.log(err);
    }
  }

  async function handleEditCompany(values) {
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

    async function editDataWithoutImage() {
      await api.put(`/company/${company.id}`, {
        name,
        active: false,
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

      Alert.alert(
        'Alteração feita com sucesso!',
        'Você será informado por e-mail assim que a sua alteração for aprovada.'
      );
    }

    async function editData(id) {
      await api.put(`/company/${company.id}`, {
        name,
        active: false,
        logo_id: id,
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

      Alert.alert(
        'Alteração feita com sucesso!',
        'Você será informado por e-mail assim que a sua alteração for aprovada.'
      );
    }

    if (image) {
      if (!company.logo || company.logo.path !== image) {
        const data = new FormData();

        data.append('file', {
          type: 'image/jpeg',
          uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
          name: image.split('/')[11],
        });

        const response = await api.post('files', data);

        Alert.alert(
          'Deseja mesmo alterar os dados?',
          'Alterar os dados da sua empresa mudará o status para "Aprovação", e só será exibida após aprovação do C.A.A.',
          [
            {
              text: 'Cancelar',
              onPress: () => {
                return null;
              },
              style: 'cancel',
            },
            { text: 'Confirmar', onPress: () => editData(response.data.id) },
          ],
          { cancelable: false }
        );

        return null;
      }
    }

    Alert.alert(
      'Deseja mesmo alterar os dados?',
      'Alterar os dados da sua empresa mudará o status para "Aprovação", e só será exibida após aprovação do C.A.A.',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            return null;
          },
          style: 'cancel',
        },
        { text: 'Confirmar', onPress: () => editDataWithoutImage() },
      ],
      { cancelable: false }
    );
    return null;
  }

  useEffect(() => {
    setLoading(true);
    loadCategories();
    setImage(company.logo && company.logo.path);
    navigation.setOptions({ title: `${company.name}` });
    getPermissionAsync();
  }, []);

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container>
        <FormCompany disable={loading}>
          <Formik
            innerRef={formikRef}
            validateOnMount
            onSubmit={(values) => Alert.alert(JSON.stringify(values))}
            initialValues={{
              name: company ? company.name : '',
              phone: company && company ? company.phone : '',
              whatsapp: company ? company.whatsapp : '',
              email: company ? company.email : '',
              website: company ? company.website : '',
              instagram: company ? company.instagram : '',
              facebook: company ? company.facebook : '',
              street: company ? company.street : '',
              number: company ? company.number : '',
              district: company ? company.district : '',
              city: company ? company.city : '',
              state: company ? company.state : '',
              zipcode: company ? company.zipcode : '',
              description: company ? company.description : '',
              discount: company ? company.discount : '',
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
                        uri:
                          company.logo && company.logo.path === image
                            ? `${API_URL}/files/${company.logo.path}`
                            : image,
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
                        backgroundColor: 'white',
                        fontSize: 17,
                      },
                    }}
                    onBlur={() => setFieldTouched('category')}
                    placeholder={{
                      key: company ? company.category : '1',
                      label: company
                        ? company.category
                        : 'Selecione uma categoria * ',
                      value: company ? company.category : 'default',
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
                      company && company.phone ? values.phone : 'Telefone '
                    }
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
                      company && company.whatsapp
                        ? values.whatsapp
                        : 'Celular / Whatsapp '
                    }
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
                    company && company.email ? values.email : 'E-mail'
                  }
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                />

                <FormInput
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={
                    company && company.website ? values.website : 'Site'
                  }
                  value={values.website}
                  onBlur={() => setFieldTouched('website')}
                  onChangeText={handleChange('website')}
                />

                <FormInput
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={
                    company && company.instagram
                      ? values.instagram
                      : 'Instagram'
                  }
                  value={values.instagram}
                  onBlur={() => setFieldTouched('instagram')}
                  onChangeText={handleChange('instagram')}
                />

                <FormInput
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={
                    company && company.facebook ? values.facebook : 'Facebook'
                  }
                  value={values.facebook}
                  onBlur={() => setFieldTouched('facebook')}
                  onChangeText={handleChange('facebook')}
                />

                <DataTitleText>Endereço</DataTitleText>

                <FormInput
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={
                    company && company.street ? values.street : 'Rua'
                  }
                  value={values.street}
                  onBlur={() => setFieldTouched('street')}
                  onChangeText={handleChange('street')}
                />

                <FormInput
                  autoCorrect={false}
                  keyboardType="numeric"
                  returnKeyType="next"
                  placeholder={
                    company && company.number ? values.number : 'Número'
                  }
                  value={values.number}
                  onBlur={() => setFieldTouched('number')}
                  onChangeText={handleChange('number')}
                />

                <FormInput
                  autoCorrect={false}
                  returnKeyType="next"
                  placeholder={
                    company && company.district ? values.district : 'Bairro'
                  }
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
                      company && company.state ? values.state : 'Estado '
                    }
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
                      company && company.zipcode ? values.zipcode : 'CEP '
                    }
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
                    company && company.discount ? values.discount : 'Desconto'
                  }
                  value={values.discount}
                  onBlur={() => setFieldTouched('discount')}
                  onChangeText={handleChange('discount')}
                />

                <SubmitButton
                  disabled={!isValid}
                  loading={loading}
                  onPress={() => handleEditCompany(values)}
                >
                  Salvar
                </SubmitButton>
              </FormView>
            )}
          </Formik>
        </FormCompany>
      </Container>
    </BackgroundContainer>
  );
};

export default EditCompany;
