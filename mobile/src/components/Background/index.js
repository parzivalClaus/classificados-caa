import styled from "styled-components/native";
import { SafeAreaView } from "react-native";

export const BackgroundContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
