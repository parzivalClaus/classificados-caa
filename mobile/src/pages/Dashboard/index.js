import React, { useEffect, useState } from 'react';
import { TextInput, Alert } from 'react-native';

import api from '../../services/api';

import logo2 from '../../assets/logo2.png';
import background from '../../assets/background-gray.png';

import {
  BackgroundContainer,
  BackgroundImage,
} from '../../components/Background';

import {
  Container,
  TopBar,
  Logo,
  SearchText,
  CategoryList,
  Category,
  CategoryBox,
  CategoryImage,
  CategoryTitle,
} from './styles';

function Dashboard({ navigation }) {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState();

  async function loadPage() {
    try {
      const result = await api.get('/categories', { params: { q: search } });

      setCategories(result.data.rows);
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
      <TopBar>
        <Logo source={logo2} />
      </TopBar>
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

        <CategoryList
          data={categories}
          extraData={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Category>
              <CategoryBox
                onPress={() => navigation.navigate('Companies', { item })}
              >
                <CategoryImage
                  source={{
                    uri: `http://192.168.10.123:3333/files/${item.logo.path}`,
                  }}
                  alt={item.name}
                />
                <CategoryTitle>{item.name}</CategoryTitle>
              </CategoryBox>
            </Category>
          )}
        />
      </Container>
    </BackgroundContainer>
  );
}

export default Dashboard;
