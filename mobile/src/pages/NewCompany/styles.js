import styled from 'styled-components/native';

import { TextInputMask } from 'react-native-masked-text';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const TopBar = styled.View`
  background-color: #d02a2a;
  width: 100%;
  align-items: center;
  padding: 15px;
`;

export const Logo = styled.Image`
  width: 140px;
  height: 45px;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px 20px;
`;

export const FormCompany = styled.View``;

export const FormView = styled.View`
  align-self: stretch;
  margin-top: 15px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  border: 3px solid #eee;
  display: ${(props) => (!props.disable ? 'flex' : 'none')};
`;

export const ErrorText = styled.Text`
  color: #f00;
  margin-bottom: 15px;
  font-size: 12px;
  margin-top: -7px;
`;

export const PhoneMaskInput = styled(TextInputMask)`
  background: #fff;
  border: 3px solid #eee;
  border-radius: 4px;
  font-size: 17px;
  padding: 6px;
  margin-bottom: 10px;
  padding-left: 25px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #333;
  opacity: ${(props) => (!props.disabled ? 1 : 0.5)};
`;
