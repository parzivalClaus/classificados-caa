import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import { darken } from 'polished';

export const Container = styled.div`
  background: #e5e5e5;
  height: 100%;
  display: flex;
`;

export const Content = styled.div`
  overflow-y: auto;

  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border-radius: 4px;
  padding: 25px;
  background: #fff;

  div.company-data {
    margin-top: 30px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 60px;

    h3 {
      color: #d02a2a;
      font-size: 20px;
      margin-bottom: 20px;
    }

    span {
      font-size: 18px;
      font-weight: bold;
    }

    input,
    textarea {
      width: 100%;
      border: 0;
      background: #f5f5f5;
      padding: 15px;
      border-radius: 4px;
      font-size: 17px;
      color: #333;
      margin-top: 3px;
      margin-bottom: 25px;
      resize: none;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div.headerButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  p {
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    text-align: left;
  }
`;

export const StyledButton = styled.button`
  background: #cccccc;
  border-radius: 4px;
  border: 0;
  color: #fff;
  font-weight: bold;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  button:hover {
    background: ${darken(0.07, '#cccccc')};
  }
  & + button {
    background: #d02a2a;
    margin-left: 16px;
  }
  & + button:hover {
    background: ${darken(0.07, '#d02a2a')};
  }
  svg {
    margin-right: 8px;
  }
`;

export const CustomAsyncSelect = styled(AsyncSelect)`
  margin-top: 3px;
  margin-bottom: 25px;
  font-size: 16px;
  color: #333;
  background-color: #f5f5f5;

  div {
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  .css-g1d714-ValueContainer {
    border: 0;
  }

  .css-yk16xz-control {
    background-color: #f5f5f5;
    border: 0;
    border-radius: 4px;
  }

  .css-1hwfws3 {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  .css-1uccc91-singleValue {
    color: #333;
    padding: 10px 0px;
    border-radius: 4px;
    background-color: #f5f5f5;
  }
`;
