import React, { useState, useEffect } from "react";

import background from "../../../assets/background-gray.png";

import {
  BackgroundContainer,
  BackgroundImage,
} from "../../../components/Background";

import { Container } from "./styles";

export default function Company({ route, navigation }) {
  const { item } = route.params;
  const [company, setCompany] = useState({});

  useEffect(() => {
    setCompany(item);
    navigation.setOptions({ title: `${item.name}` });
  }, []);

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container />
    </BackgroundContainer>
  );
}
