import { Platform, Image } from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  width: 100%;
`;

export const Logo = styled(Image)`
  width: 210px;
  height: 200px;
`;

export const FormView = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  background-color: #fff;
  background: #fff;
`;

export const ErrorText = styled.Text`
  color: #f00;
  margin-bottom: 15px;
  font-size: 12px;
  margin-top: -7px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  opacity: ${(props) => (!props.disabled ? 1 : 0.5)};
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
