import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #d02a2a;
  color: #fff;

  div.box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #fff;
    padding: 40px;
    max-width: 420px;
    border-radius: 4px;

    img {
      max-width: 170px;
      height: auto;
      margin-top: -110px;
      margin-bottom: 20px;
    }

    h1 {
      color: ${(props) => (props.error ? '#d02a2a' : '#333')};
      margin-bottom: 15px;
      font-size: 30px;
    }

    p {
      color: #000;
      font-weight: bold;
      font-size: 20px;
    }
  }
`;
