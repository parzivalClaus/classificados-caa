import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px 20px;
`;

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

export const SearchText = styled.Text`
  padding: 0 10px;
  color: #333;
  font-size: 18px;
  text-align: center;
`;

export const CategoryList = styled.FlatList.attrs({
  numColumns: 2,
})`
  padding: 0px 0px 0px 0px;
`;

export const Category = styled.View`
  width: 100%;
  max-width: 50%;
  padding: 0 10px 15px 10px;
`;

export const CategoryBox = styled(TouchableOpacity)`
  background: #fff;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #eee;
  align-items: center;
  padding: 10px;
  height: 140px;
`;

export const CategoryImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const CategoryTitle = styled.Text`
  text-align: center;
  margin-top: 8px;
`;
