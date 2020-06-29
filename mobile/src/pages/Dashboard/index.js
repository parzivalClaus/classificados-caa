import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";

import api from "../../services/api";

// import { Container } from './styles';

function Dashboard({ navigation, isFocused }) {
  const [categories, setCategories] = useState();

  async function loadPage() {
    try {
      const result = await api.get("/categories");

      setCategories(result.data.rows);
      console.log(result.data.rows);
    } catch (err) {
      console.log(err.response);
      Alert.alert(err.response.data.error);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <View>
      <FlatList
        key="list"
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Companies", { item })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Dashboard;
