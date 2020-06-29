import { Platform, Image } from "react-native";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === "ios",
  behavior: "padding",
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  width: 100%;
`;

export const Logo = styled(Image)`
  width: 160px;
  height: 150px;
`;

export const SucessTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-top: 35px;
  line-height: 25px;
`;

export const SuccessText = styled.Text`
  font-size: 18px;
  margin-top: 15px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
  width: 100%;
`;

export const SignLinkText = styled.Text`
  text-align: right;
  font-weight: bold;
  font-size: 16px;
`;
