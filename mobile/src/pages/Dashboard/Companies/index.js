import React from "react";
import { View, Text } from "react-native";

// import { Container } from './styles';

export default function Companies({ route }) {
  const { item } = route.params;
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
}
