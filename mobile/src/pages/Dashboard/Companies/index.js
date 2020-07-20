import React, { useState, useEffect } from 'react';
import { Alert, TextInput } from 'react-native';

import background from '../../../assets/background-gray.png';

import {
  BackgroundContainer,
  BackgroundImage,
} from '../../../components/Background';

import {
  Container,
  SearchText,
  CompanyList,
  Company,
  CompanyBox,
  CategoryImage,
  CompanyImage,
  CompanyTitle,
} from './styles';

import api from '../../../services/api';

export default function Companies({ route, navigation }) {
  const { item } = route.params;
  const [category, setCategory] = useState({});
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState();

  useEffect(() => {
    setCategory(item);
    navigation.setOptions({ title: `${item.name}` });
  }, []);

  async function loadPage() {
    try {
      const result = await api.get(`category/${item.id}/companies`, {
        params: { q: search, active: true },
      });

      setCompanies(result.data.rows);
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
  }

  useEffect(() => {
    loadPage();
  }, [search]);

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container>
        <SearchText>Encontre o que você procura:</SearchText>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            backgroundColor: '#fff',
            borderRadius: 4,
            margin: 10,
            padding: 10,
          }}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />

        <CompanyList
          data={companies}
          extraData={companies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Company>
              <CompanyBox
                onPress={() =>
                  navigation.navigate('Company', { item, cat: category })
                }
              >
                {item.logo ? (
                  <CompanyImage
                    source={{
                      uri: `http://192.168.10.123:3333/files/${item.logo.path}`,
                    }}
                    alt={item.name}
                  />
                ) : (
                  <>
                    <CategoryImage
                      source={{
                        uri: `http://192.168.10.123:3333/files/${category.logo.path}`,
                      }}
                      alt={item.name}
                    />
                    <CompanyTitle>{item.name}</CompanyTitle>
                  </>
                )}
              </CompanyBox>
            </Company>
          )}
        />
      </Container>
    </BackgroundContainer>
  );
}
