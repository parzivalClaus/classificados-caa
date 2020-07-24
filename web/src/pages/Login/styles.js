import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  background: #d02a2a;

  img {
    width: 163px;
    height: auto;
    display: block;
    margin: 0 auto;
    margin-top: -90px;
    margin-bottom: 15px;
  }
`;

export const StyledForm = styled(Form)`
  background: #fff;
  padding: 20px;
  width: 320px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  div.inputBox {
    margin-top: 20px;

    strong {
      color: #333;
      font-size: 15px;
    }
  }

  input {
    background: #f1f1f1;
    border: 0px;
    font-size: 16px;
    padding: 10px;
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;

    &::placeholder {
      color: #aeaeae;
    }
  }

  span {
    color: #d02a2a;
    font-weight: bold;
    font-size: 12px;
    width: 100%;
    margin-top: 6px;
    display: block;
  }

  button {
    background: #333;
    color: #fff;
    border: 0;
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    margin-top: 15px;

    &:hover {
      background: ${darken(0.07, '#333')};
    }
  }
`;
