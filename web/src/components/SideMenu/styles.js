import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #d02a2a;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  height: 100%;
  border-right: 8px #333 solid;

  div.topContent {
    width: 100%;

    img {
      padding: 20px;

      width: 100%;
      padding-bottom: 15px;
      box-sizing: border-box;
    }

    hr {
      margin: 0 20px;

      border: 0;
      border-bottom: 4px solid #fff;
    }

    ul {
      margin-top: 20px;
      width: 100%;

      p {
        background: #fff;
        width: 100%;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
        color: #d02a2a;
        margin-bottom: 10px;
      }

      li {
        padding: 8px 20px;
      }

      a {
        color: #fff;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  div.bottomContent {
    width: 100%;
    padding: 20px;

    button {
      background: #fff;
      color: #d02a2a;
      padding: 10px;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      width: 100%;

      &:hover {
        background: ${darken(0.07, '#fff')};
      }
    }
  }
`;
