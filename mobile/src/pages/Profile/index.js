import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

import { signOut } from "../../store/modules/auth/actions";

// import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
