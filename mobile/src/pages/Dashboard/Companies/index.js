import React, { useEffect } from "react";
import { View, Text } from "react-native";

// import { Container } from './styles';

export default function Companies({ route, navigation }) {
  const { item } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: `${item.name}` });
  }, []);

  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
}
