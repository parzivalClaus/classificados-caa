import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #e5e5e5;
  height: 100%;
  display: flex;
`;

export const Content = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  border-radius: 4px;
  padding: 25px;
  background: #fff;

  footer {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const GridBox = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto 25%;

  .grid-cell {
    font-size: 18px;
    padding: 20px 0;
    border-bottom: 2px solid #fee;
    display: flex;
    align-items: center;

    button {
      background: #d02a2a;
      border: 0;
      color: #fff;
      padding: 10px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

export const GridTitle = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 15px;
  color: #d02a2a;
  padding-bottom: 15px;
  border-bottom: 4px solid #d02a2a;
`;

export const Button = styled.button`
  background: #d02a2a;
  color: #fff;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  border: 0;
  border-radius: 4px;
  opacity: ${(props) => (props.disabled ? 0 : 1)};
  &:hover {
    /* background: ${darken(0.07, '#d02a2a')}; */
    background: ${(props) =>
      props.disabled ? '#d02a2a' : `${darken(0.07, '#d02a2a')}`};
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  }
`;
