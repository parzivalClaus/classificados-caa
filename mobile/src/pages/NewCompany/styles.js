import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

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
  padding: 20px 35px;
`;

export const HasCompanyText = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  text-align: center;
`;

export const CompanyImageLink = styled(TouchableOpacity)``;

export const CompanyImage = styled.Image`
  width: 80%;
  padding-top: 80%;
  margin: 0 auto;
  margin-top: 25px;
`;

export const CategoryImage = styled.Image`
  width: 80%;
  padding-top: 80%;
  margin: 0 auto;
  margin-top: 25px;
  border: 3px #eee;
`;

export const CompanyTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  text-decoration: underline;
  color: #d02a2a;
`;

export const LogoBox = styled(TouchableOpacity)`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 6px solid #eee;
`;

export const LogoText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export const FormCompany = styled.View`
  display: ${(props) => (!props.disable ? 'flex' : 'none')};
`;

export const FormView = styled.ScrollView`
  align-self: stretch;
  margin-top: 15px;
`;

export const DataTitleText = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  border: 3px solid #eee;
  display: ${(props) => (!props.disable ? 'flex' : 'none')};
`;

export const BoxInput = styled.View`
  padding: 6px 25px;
  background: #fff;
  border: 3px solid #eee;
  margin-bottom: 10px;
`;

export const ErrorText = styled.Text`
  color: #f00;
  margin-bottom: 15px;
  font-size: 12px;
  margin-top: -7px;
`;

export const PhoneMaskInput = styled(TextInputMask)`
  color: #a0a0a0;
  font-size: 17px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #333;
  opacity: ${(props) => (!props.disabled ? 1 : 0.5)};
`;
