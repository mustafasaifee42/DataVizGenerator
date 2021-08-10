import styled, { createGlobalStyle } from 'styled-components';
import { useState } from 'react';
import Modal from 'react-modal';
import { BodyEl } from './BodyEl';
import ReactGA from 'react-ga';

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
      -webkit-transition: all .3s ease;
      transition: all .3s ease;
      line-height: 1.15;
  }

  h1 {
    font-size: 22px;
  }

  h2 {
    padding: 0 20px;
  }

  body {
    font-size: 16px;
    background-color: #F1F1F1;
    padding: 0;
    margin: 0;
    min-width: 100%;
    color: #333333;
  }

  h6 {
    font-size: 12px;
  }

  .bold {
    font-weight: 700;
  }

  button {
    padding: 15px 20px;
    font-family: 'IBM Plex Sans';
    background-color: #FFF;
    color: #333333;
    border-radius: 3px;
    font-size: 16px;
    border: 1px solid #DDD;
    cursor: pointer;
    text-transform: uppercase;

    font-weight: 700;
    &:hover {
      background-color: #FFF;
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

  .ReactModal__Overlay{
    z-index: 10000;
  }

  .modal {
    width: 90vw;
    max-height: 90vh;
    max-width: 720px;
    margin: auto;
    background-color: #FAFAFA;
    border: 0 !important;
    padding: 0;
    box-shadow: 0 2px 5px rgba(12,13,14,0.05);
    color: #333333;
    &:focus {
      outline: none;
    }
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(245,245,245,0.85);
    display: flex;
    align-items: center;
  }
`;

const TitleDiv = styled.div`
  font-size: 18px;
  color: #333;
`;

const ModalHeading = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
`;

const ModalContent = styled.div`
  overflow: auto;
  padding: 0 20px 20px;
  max-height: calc(90vh - 67px);
  line-height: 28px;
`;

const AboutButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: 0;
  font-weight: 400;
  text-transform: none;
  &:hover {
    background-color: transparent;
  }
`;

const Footer = styled.div`
  position: fixed;
  cursor: pointer;
  bottom: 0;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;
  background-color: rgba(60, 60, 60, 0.5);
  right: 0;
`;

ReactGA.initialize('UA-204312264-1');
ReactGA.set({ anonymizeIp: true });
ReactGA.pageview('/');

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <GlobalStyle />
      <header>
        <TitleDiv>
          <span className='bold'>Dashboard</span>Bot
        </TitleDiv>
        <AboutButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          About
        </AboutButton>
      </header>
      <BodyEl />
      {showFooter ? (
        <Footer
          onClick={() => {
            setShowFooter(false);
          }}
        >
          DashboardBot uses cookies to track analytics. Click to hide.
        </Footer>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='About Modal'
        ariaHideApp={false}
        className={'modal'}
        overlayClassName={'overlay'}
      >
        <ModalHeading>
          <h2>About DashboardBot</h2>
        </ModalHeading>
        <ModalContent>
          DashboardBot is an algorithm-driven design tool applied to data
          visualization. It generates variations of designs for dashboard and
          different graphs.
          <br />
          <br />
          <span className='bold'>Inspiration</span>
          <br />
          DashboardBot is inspired by{' '}
          <a
            href='https://www.uibot.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Uibot
          </a>{' '}
          by{' '}
          <a
            href='https://twitter.com/jaukia'
            target='_blank'
            rel='noopener noreferrer'
          >
            Janne Aukia
          </a>
          . The inspiration of styles comes from various examples on Dribbble.
          <br />
          <br />
          <span className='bold'>Implementation</span>
          <br />
          DashboardBot is built using{' '}
          <a
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React
          </a>
          ,{' '}
          <a
            href='https://styled-components.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Styled-Components
          </a>{' '}
          and{' '}
          <a href='https://d3js.org/' target='_blank' rel='noopener noreferrer'>
            D3
          </a>{' '}
          (for graphs). This project was bootstrapped with{' '}
          <a
            href='https://github.com/facebook/create-react-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Create React App
          </a>
          . The source code can be found on{' '}
          <a
            href='https://github.com/mustafasaifee42/DataVizGenerator'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github.
          </a>{' '}
          Favicon is{' '}
          <a
            target='_blank'
            href='https://icons8.com/icon/q7wteb2_yVxu/bot'
            rel='noopener noreferrer'
          >
            Bot
          </a>{' '}
          icon by{' '}
          <a
            target='_blank'
            href='https://icons8.com'
            rel='noopener noreferrer'
          >
            Icons8
          </a>
          <br />
          <br />
          <span className='bold'>Feedback</span>
          <br />
          You can find me on{' '}
          <a
            href='https://twitter.com/mustafasaifee42'
            target='_blank'
            rel='noopener noreferrer'
          >
            Twitter
          </a>{' '}
          or send me an{' '}
          <a
            href='mailto:saifee.mustafa@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            e-mail
          </a>{' '}
          for feedbacks, comments or suggestions.
          <br />
          <br />
          <span className='bold'>Privacy Policy</span>
          <br />
          This website does not save any information about you. We do not
          directly use cookies or other tracking technologies. We do, however,
          use Google Analytics for mere statistical reasons. It is possible that
          Google Analytics sets cookies or uses other tracking technologies, but
          this data is not directly accessible by us.
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
