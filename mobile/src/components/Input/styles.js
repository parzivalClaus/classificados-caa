import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: #fff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({})`
  flex: 1;
  font-size: 17px;
  margin-left: 10px;
  background-color: #ffffff;
  color: #a0a0a0;
`;
