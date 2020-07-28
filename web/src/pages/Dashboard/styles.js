import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #e5e5e5;
  height: 100%;
  display: flex;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  button {
    margin: 30px 30px 0px 30px;
    color: #fff;
    background: #d02a2a;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    font-size: 23px;
    text-transform: uppercase;
    padding: 15px;

    &:hover {
      background: ${darken(0.07, '#d02a2a')};
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  flex: 1;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    margin: 30px;
    text-align: center;

    strong {
      color: #d02a2a;
      font-weight: bold;
      font-size: 40px;
    }

    p {
      color: #333;
      font-size: 70px;
      font-weight: bold;
    }
  }
`;
