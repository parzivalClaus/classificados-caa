import React, { useState, forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Container, TInput } from "./styles";

function Input({ style, icon, ...rest }, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <Container style={style}>
      {icon && <Ionicons name={icon} size={20} color="#a0a0a0" />}
      <TInput
        {...rest}
        ref={ref}
        secureTextEntry={icon !== "md-lock" ? false : !visible}
      />
      {icon === "md-lock" && (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Ionicons
            name={visible ? "md-eye-off" : "md-eye"}
            size={20}
            color="#a0a0a0"
          />
        </TouchableOpacity>
      )}
    </Container>
  );
}

export default forwardRef(Input);
