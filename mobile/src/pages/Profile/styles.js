import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

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

export const LogoutButton = styled(TouchableOpacity)`
  background-color: #d02a2a;
  border-radius: 4px;
`;

export const LogoutText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;

export const DataBox = styled.View`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const DataTittle = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

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

export const PasswordBox = styled.View`
  display: ${(props) => (!props.disable ? 'flex' : 'none')};
`;

export const ChangePasswordButton = styled(TouchableOpacity)`
  margin-bottom: 10px;
`;

export const ChangePasswordText = styled.Text`
  color: #f00;
  font-weight: bold;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #333;
  opacity: ${(props) => (!props.disabled ? 1 : 0.5)};
`;
