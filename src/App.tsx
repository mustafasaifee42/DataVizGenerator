import styled, { createGlobalStyle } from 'styled-components';
import { BodyEl } from './BodyEl';

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
      -webkit-transition: all .3s ease;
      transition: all .3s ease;
      line-height: 1.15;
  }

  h1 {
    font-size: 24px;
  }

  body {
    font-size: 16px;
    background-color: #F1F1F1;
    padding: 0;
    margin: 0;
    min-width: 100%;
  }

  h6 {
    font-size: 12px;
  }

  .bold {
    font-weight: 700;
  }

  button {
    padding: 10px;
    font-family: 'IBM Plex Sans';
    background-color: #DDDDDD;
    color: #333333;
    border-radius: 3px;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
    &:hover {
      background-color: #CCCCCC;
    }
  }

  header {
    background-color: #FFFFFF;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: #999999;
  }
`;

const TitleDiv = styled.div`
  font-size: 18px;
  color: #333;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <header>
        <TitleDiv>
          <span className='bold'>DataViz</span>Generator
        </TitleDiv>
        <>About</>
      </header>
      <BodyEl />
    </>
  );
}

export default App;
